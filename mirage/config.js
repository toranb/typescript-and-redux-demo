export default function() {
  this.timing = 1;
  this.logging = false;
  this.get('/api/restaurants');
  this.get('/api/restaurants/:id');
}
