import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

import LinkComponent from '@ember/routing/link-component';

LinkComponent.reopen({
  attributeBindings: ['test-id']
});

setApplication(Application.create(config.APP));

start();
