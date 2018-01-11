import wait from 'ember-test-helpers/wait';

export default function(trigger) {
  return () => {
    trigger();
    return wait();
  };
}
