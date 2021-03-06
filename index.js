import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openState: props.openStatus,
      showTexts: props.showText
    }
  }

  componentDidMount() {
    if(this.refs.main) {
      this.measureText();
    }
  }

  measureText() {
    let that = this;
    let {showTexts} = this.state;
    let {lineMax, lineNum} = this.props;
    if (lineMax > 0 && showTexts.length > lineMax * lineNum) { // 如果文字特别长计算量比较大
      showTexts = showTexts.slice(0, lineMax * lineNum - 1);
    }
    if (showTexts && showTexts.length>0 && this.refs.main && this.refs.main.offsetHeight < this.refs.main.scrollHeight) {
      this.setState({showTexts: showTexts.slice(0, showTexts.length-2)}, function() {
        setTimeout(function() {
          that.measureText();
        }, 1);
      });
    }
  }

  handleOpenText() {
    let that = this;
    this.setState({showTexts: this.props.showText, openState: !this.state.openState}, function() {
      if(this.state.openState) {
        that.measureText();
      }
    });
  };

  render() {
    const {showTexts, openState} = this.state;
    const {openText, collapseText, operationStyle, contentStyle} = this.props;
    return (<div ref="main" 
              className={openState ? "open-main" : "open-main1"} 
              style={contentStyle}>
      {showTexts}
      <div className="open-operation">
        {openState && '...'}
        <div onClick={this.handleOpenText.bind(this)}
            className="open-btn"
            style={operationStyle}>
          {openState ? openText : collapseText}
        </div>
      </div>
    </div>)
  }
}

TextOpen.propTypes = {
  showText: PropTypes.string,
  openText: PropTypes.string,
  collapseText: PropTypes.string,
  lineMax: PropTypes.number,
  lineNum: PropTypes.number,
  contentStyle: PropTypes.object,
  operationStyle: PropTypes.object,
  openStatus: PropTypes.bool
};

TextOpen.defaultProps = {
  showText: '',
  openText: '展开',
  collapseText: '收起',
  lineMax: 0,
  lineNum: 2,
  contentStyle: {},
  operationStyle: {},
  openStatus: true
};