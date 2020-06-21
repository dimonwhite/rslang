export default class StatisticsView {
  constructor() {
    this.statistics = document.getElementById('tbody');
  }

  renderHTML() {
    this.statistics.innerHTML = '';
    const row = document.createElement('tr');
    const date = document.createElement('td');
    date.innerHTML = 'statistics';
    row.append(date);
    this.statistics.append(row);
  }
}
