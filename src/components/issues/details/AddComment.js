import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import MarkDown from 'react-markdown/with-html';
import { isEmpty } from 'lodash/fp';
import { get } from 'lodash/fp';

import { postComment } from 'actions/issues.actions';

type ConnectedProps = {
  postComment: () => void
};

type State = {
  comment: string,
  editMode: boolean,
  typeError: boolean
};

class AddComment extends Component<ConnectedProps, State> {
  state = {
    comment: '',
    editMode: true,
    typeError: false
  };

  renderEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  renderDisplayMode = () => {
    this.setState({
      editMode: false
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleCommentSubmit = () => {
    if (isEmpty(this.state.comment)) {
      this.setState({
        typeError: true
      });
      return;
    }
    console.log('props: ', this.props.match.params);
    const user = JSON.parse(localStorage.getItem('auth'));
    const token = get('user.token', user);
    this.props.postComment(
      this.props.match.params,
      {
        body: this.state.comment
      },
      token
    );
    this.setState({
      comment: '',
      editMode: true,
      typeError: false
    });
  };

  render() {
    return (
      <Wrapper>
        <AddCommentContainer>
          <DashBoard>
            <DisplayMode onClick={this.renderEditMode}>Write</DisplayMode>
            <DisplayMode onClick={this.renderDisplayMode}>Preview</DisplayMode>
          </DashBoard>
          <DisplayContainer>
            <ErrorDisplay active={this.state.typeError}>
              You can't comment at this time — your comment cannot be blank.
            </ErrorDisplay>
            <TextArea
              value={this.state.comment}
              onChange={this.handleCommentChange}
              active={this.state.editMode}
              placeholder="Leave a comment"
            />
            <MarkDownPreview active={this.state.editMode}>
              <MarkDown source={this.state.comment} escapeHtml={false} />
            </MarkDownPreview>
          </DisplayContainer>
          <FormAction>
            <InfoText>Styling with Markdown is supported</InfoText>
            <SubmitButton onClick={this.handleCommentSubmit}>
              Comment
            </SubmitButton>
          </FormAction>
        </AddCommentContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 700px;
  padding-left: 50px;
  position: relative;
`;

const AddCommentContainer = styled.div`
  border: 1px solid #d1d5da;
`;

const DashBoard = styled.div`
  padding-top: 6px;
  padding-left: 10px;
  margin-bottom: 10px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d1d5da;
`;

const DisplayMode = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;

  &:first-child {
    margin-right: 5px;
  }
`;

const DisplayContainer = styled.div`
  padding: 5px;
`;

const TextArea = styled.textarea`
  font-size: 16px;
  color: #24292e;
  padding: 10px;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  margin: 0 auto;
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
  vertical-align: middle;
  display: none;

  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

const MarkDownPreview = styled.div`
  min-height: 100px;
  padding: 10px;
  display: none;

  ${({ active }) =>
    !active &&
    `
    display: block;
  `};
`;

const ErrorDisplay = styled.div`
  margin-bottom: 10px;
  padding: 15px 10px;
  color: #821919;
  background-color: #fbdce0;
  border: 1px solid #d9c0c4;
  border-radius: 3px;
  display: none;

  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

const FormAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  margin: 5px 0;
`;

const InfoText = styled.h3`
  color: #586069;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  color: #fff;
  background: ${({ theme }) => theme.greenGradient};
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  cursor: pointer;
`;

export default withRouter(connect(null, { postComment })(AddComment));
