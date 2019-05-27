import Component from '@ember/component';
import layout from '../templates/components/kaleidos-viewer';
import DS from 'ember-data';
import fetch from 'fetch';
import { get } from '@ember/object';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  
  documentVersion: undefined,
  
  htmlSnippet: computed('documentVersion.convertedFile', function () {
    if( this.documentVersion && this.documentVersion.convertedFile )
    {
      console.log(`Fetching converted file`);
      const url = new URL(`/files/${get(this,'documentVersion.convertedFile.id')}/download`, window.location.href);
      return DS.PromiseObject.create({
        promise: fetch(url).then((response) => {
          return response.text()
        })
      });
    } else {
      return '';
    }
})

});



