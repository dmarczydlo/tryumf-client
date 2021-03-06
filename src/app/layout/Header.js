import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        title="Tryumf"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.props.leftIconClick}
      />
    );
  }
}