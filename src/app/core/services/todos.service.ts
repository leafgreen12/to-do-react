export class TodosService {
  getTodos() {
    return fetch('https://run.mocky.io/v3/b4dfc957-40ee-4458-b064-6428a8f021db').then(res => res.json());
  }
}
