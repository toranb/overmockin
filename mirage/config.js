export default function() {
  this.timing = 1;
  this.logging = false;
  this.get('/api/information');
  this.get('/api/configuration');
  this.post('/api/configuration/toggle/:id', () => { });
}
