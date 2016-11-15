import {RouterModule} from'@angular/router';
const routes = [
  {path: '', loadChildren: 'app/home/home.module'},
  {path: 'nrel', loadChildren: 'app/nrel/nrel.module'},
  {path: 'address', loadChildren: 'app/addressSearch/addressSearch.module'}
];

export default RouterModule.forRoot(routes);