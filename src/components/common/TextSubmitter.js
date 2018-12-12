import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MarkDown from 'react-markdown/with-html';
import styled from 'styled-components';
import { isEmpty } from 'lodash/fp';

type Props = {
  includeTitle: boolean,
  height: string,
  Submit: string,
  handleSubmit: () => void
};

type State = {
  title: string,
  comment: string,
  editMode: boolean,
  typeError: boolean
};

class TextSubmitter extends Component<Props, State> {
  state = {
    title: '',
    comment: '',
    editMode: true,
    typeError: false
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  renderDisplayMode = () => {
    this.setState({
      editMode: false
    });
  };

  renderEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  // TODO support generic action handling
  handleSubmitText = () => {
    if (this.props.includeTitle) {
      if (isEmpty(this.state.title) || isEmpty(this.state.comment)) {
        this.setState({
          typeError: true
        });
        return;
      }
      const content = { title: this.state.title, comment: this.state.comment };
      this.props.handleSubmit(content);
      if (this.props.redirect) {
        this.props.history.push(this.props.redirect);
      }
      return;
    }

    if (!isEmpty(this.state.comment)) {
      const content = { comment: this.state.comment };
      this.props.handleSubmit(content);
      if (this.props.redirect) {
        this.props.history.push(this.props.redirect);
      }
      return;
    }
    this.setState({
      typeError: true
    });
  };

  render() {
    return (
      <Wrapper>
        <AddIssueContainer>
          <TitleContainer
            onChange={this.handleTitleChange}
            active={this.props.includeTitle}>
            <TitleInput placeholder="Title.." />
          </TitleContainer>
          <DashBoard>
            <WriteMode
              onClick={this.renderEditMode}
              active={this.state.editMode}>
              Write
            </WriteMode>
            <PreviewMode
              onClick={this.renderDisplayMode}
              active={this.state.editMode}>
              Preview
            </PreviewMode>
          </DashBoard>
          <DisplayContainer>
            <ErrorDisplay active={this.state.typeError}>
              You can't comment at this time — your text cannot be blank.
            </ErrorDisplay>
            <TextArea
              height={this.props.height}
              value={this.state.comment}
              onChange={this.handleCommentChange}
              active={this.state.editMode}
              placeholder="Leave a comment"
            />
            <MarkDownPreview
              active={this.state.editMode}
              height={this.props.height}>
              <MarkDown source={this.state.comment} escapeHtml={false} />
            </MarkDownPreview>
          </DisplayContainer>
          <FormAction>
            <InfoText>Styling with Markdown is supported</InfoText>
            <SubmitButton onClick={this.handleSubmitText}>
              {this.props.submitText}
            </SubmitButton>
          </FormAction>
        </AddIssueContainer>
      </Wrapper>
    );
  }
}

TextSubmitter.defaultProps = {
  includeTitle: false,
  height: '100px',
  submitText: 'Submit'
};

TextSubmitter.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  width: 700px;
  padding-left: 50px;
  position: relative;
`;

const AddIssueContainer = styled.div`
  border: 1px solid #d1d5da;
`;

const TitleContainer = styled.div`
  padding: 5px;
  display: none;
  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 4px 10px;
  background-color: #f6f8fa;
  border: 1px solid #d1d5da;
  border-radius: 3px;
`;

const DashBoard = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  // margin-bottom: 10px;
  border-bottom: 1px solid #d1d5da;
`;

const WriteMode = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-right: 5px;

  ${({ active }) =>
    active &&
    `
    color: blue;
  `};
`;

const PreviewMode = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${({ active }) =>
    !active &&
    `
    color: blue;
  `};
`;

const DisplayContainer = styled.div`
  padding: 5px;
`;

const TextArea = styled.textarea`
  font-size: 16px;
  color: #24292e;
  padding: 10px;
  background-color: #f6f8fa;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  margin: 0 auto;
  max-width: 100%;
  min-width: 100%;
  vertical-align: middle;
  display: none;
  ${({ height }) =>
    height &&
    `
    min-height: ${height};
`} ${({ active }) =>
      active &&
      `
    display: block;
  `};
`;

const MarkDownPreview = styled.div`
  min-height: 200px;
  padding: 10px;
  display: none;
  ${({ height }) =>
    height &&
    `
    min-height: ${height};
  `} ${({ active }) =>
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

export default withRouter(TextSubmitter);
