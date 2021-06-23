import {RouterModule, Routes} from '@angular/router';
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {MaterialsComponent} from "./components/materials/materials.component";
import {NewsComponent} from "./components/news/news.component";
import {StudentsComponent} from "./components/students/students.component";
import {ParentsComponent} from "./components/parents/parents.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";
import {FolderComponent} from "./components/folder/folder.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthGuard} from "./auth.guard";

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'materials', component: MaterialsComponent},
    {path: 'news', component: NewsComponent},
    {path: 'students', component: StudentsComponent},
    {path: 'parents', component: ParentsComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'folder/:id', component: FolderComponent},
    {path: '**', redirectTo: 'page-not-found'}
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
