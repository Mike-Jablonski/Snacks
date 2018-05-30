import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'
import InnerToolTip             from './InnerToolTip'
import TooltipOverlay           from './TooltipOverlay'

class Tooltip extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf([
      'small',
      'medium',
      'large',
    ]),
    placement: PropTypes.oneOf([
      'top',
      'left',
      'right',
      'bottom',
    ]),
    target: PropTypes.node.isRequired,
    snacksStyle: PropTypes.oneOf(['primary', 'secondary', 'dark'])
  }

  static defaultProps = {
    snacksStyle: 'dark',
    placement: 'bottom',
    size: 'small'
  }

  state = {
    show: false
  }

  handleToggle = () => {
    this.setState(({ show }) => ({ show: !show }))
  }

  handleHideToolTip = () => {
    this.setState({ show: false })
  }

  renderTriggerElement() {
    const { target } = this.props
    const { show } = this.state

    if (target) {
      return React.cloneElement(target, {
        ref: (node) => {
          this.trigger = node
        },
        onClick: this.handleToggle.bind(this),
        'aria-haspopup': true,
        'aria-expanded': show
      })
    }
  }

  render() {
    const {
      children,
      placement,
      size,
      snacksStyle
    } = this.props

    return (
      <div>
        {this.renderTriggerElement()}
        <TooltipOverlay
          placement={placement}
          target={() => this.trigger}
          show={this.state.show}
          onRootClose={this.handleHideToolTip}
        >
          <InnerToolTip
            size={size}
            snacksStyle={snacksStyle}
          >
            {children}
          </InnerToolTip>
        </TooltipOverlay>
      </div>
    )
  }
}

export default Tooltip
