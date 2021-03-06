var React = require('react/addons');
var PureRenderMixin = require('react').addons.PureRenderMixin;
var Fluxxor = require("fluxxor");
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var moment = require('moment');

var Rating = require('./rating');
var FluxMixin = require('./mixins/flux-mixin');
var Panel = require('./common/panel');


var ImageDataPanel = React.createClass({
  mixins: [PureRenderMixin, FluxMixin, StoreWatchMixin("Media")],

  getStateFromFlux: function() {
    var store = this.getFlux().store('Media');
    var selected = store.getSelectedMedia();

    return {
      media: selected
    };
  },

  render: function() {
    var media = this.state.media;

    return (
      <Panel fill={true} className="mediacat-information-panel">
        <table>
          <tr>
            <th scope="row">Width</th>
            <td>{media && media.get('width')}</td>
          </tr>
          <tr>
            <th scope="row">Height</th>
            <td>{media && media.get('height')}</td>
          </tr>
          <tr>
            <th scope="row">Date Uploaded</th>
            <td>{media && moment(media.get('date_created')).format('LLL')}</td>
          </tr>
          <tr>
            <th scope="row">Rating</th>
            <td>{media ? <Rating size="large" media={media} /> : null}</td>
          </tr>
        </table>
      </Panel>
    );
  }
});

module.exports = ImageDataPanel;