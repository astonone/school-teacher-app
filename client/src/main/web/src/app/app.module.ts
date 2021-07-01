import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {MainUiModule} from './modules/main-ui/main-ui.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCoffee, fas} from '@fortawesome/free-solid-svg-icons';

/*Pipe*/
import {SafeHtml} from './pipe/safe.html';

/*Services*/
import {UserService} from './services/user.service';
import {SharedService} from './services/shared.service';
import {MaterialsService} from './services/materials.service';
import {NewsService} from './services/news.service';
import {FeedbackService} from './services/feedback.service';
import {MetricsService} from './services/admin/metrics.service';
import {HealthService} from './services/admin/health.service';
import {ConfigurationService} from './services/admin/configuration.service';
import {LogsService} from './services/admin/logs.service';

/*Components*/
import {HomeComponent} from './components/home/home.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {SettingsComponent} from './components/settings/settings.component';
import {MaterialsComponent} from './components/materials/materials.component';
import {FolderComponent} from './components/folder/folder.component';
import {NewsComponent} from './components/news/news.component';
import {StudentsComponent} from './components/students/students.component';
import {ParentsComponent} from './components/parents/parents.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MetricsComponent} from './components/admin/metrics/metrics.component';
import {JvmMemoryComponent} from './components/admin/metrics/blocks/jvm-memory/jvm-memory.component';
import {JvmThreadsComponent} from './components/admin/metrics/blocks/jvm-threads/jvm-threads.component';
import {MetricsCacheComponent} from './components/admin/metrics/blocks/metrics-cache/metrics-cache.component';
import {MetricsDatasourceComponent} from './components/admin/metrics/blocks/metrics-datasource/metrics-datasource.component';
import {MetricsEndpointsRequestsComponent} from './components/admin/metrics/blocks/metrics-endpoints-requests/metrics-endpoints-requests.component';
import {MetricsGarbageCollectorComponent} from './components/admin/metrics/blocks/metrics-garbagecollector/metrics-garbagecollector.component';
import {MetricsModalThreadsComponent} from './components/admin/metrics/blocks/metrics-modal-threads/metrics-modal-threads.component';
import {MetricsRequestComponent} from './components/admin/metrics/blocks/metrics-request/metrics-request.component';
import {MetricsSystemComponent} from './components/admin/metrics/blocks/metrics-system/metrics-system.component';
import {HealthComponent} from './components/admin/health/health.component';
import {HealthModalComponent} from './components/admin/health/modal/health-modal.component';
import {ConfigurationComponent} from './components/admin/configuration/configuration.component';
import {LogsComponent} from './components/admin/logs/logs.component';

/*Popups*/
import {LoginPopup} from './components/home/popup/login/login-popup';
import {RegistrationPopup} from './components/home/popup/registration/registration-popup';
import {UploadPopup} from './components/folder/popup/upload/upload-popup';
import {CreateFolderPopup} from './components/materials/popup/folders/create-rename/create-folder-popup';
import {DeleteFolderPopup} from './components/materials/popup/folders/delete/delete-folder-popup';
import {DeleteFilePopup} from './components/folder/popup/delete/delete-file-popup';
import {DeleteNewPopup} from './components/news/popup/delete/delete-new-popup';
import {CreateNewPopup} from './components/news/popup/create/create-new-popup';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MainUiModule,
        FontAwesomeModule,
        NgbModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PortfolioComponent,
        SettingsComponent,
        MaterialsComponent,
        FolderComponent,
        NewsComponent,
        StudentsComponent,
        ParentsComponent,
        FeedbackComponent,
        PageNotFoundComponent,
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateFolderPopup,
        DeleteFolderPopup,
        DeleteFilePopup,
        DeleteNewPopup,
        CreateNewPopup,
        SafeHtml,
        MetricsComponent,
        JvmMemoryComponent,
        JvmThreadsComponent,
        MetricsCacheComponent,
        MetricsDatasourceComponent,
        MetricsEndpointsRequestsComponent,
        MetricsGarbageCollectorComponent,
        MetricsModalThreadsComponent,
        MetricsRequestComponent,
        MetricsSystemComponent,
        HealthComponent,
        HealthModalComponent,
        ConfigurationComponent,
        LogsComponent
    ],
    entryComponents: [
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateFolderPopup,
        DeleteFolderPopup,
        DeleteNewPopup,
        CreateNewPopup,
        DeleteFilePopup
    ],
    providers: [
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateFolderPopup,
        DeleteFolderPopup,
        DeleteFilePopup,
        DeleteNewPopup,
        CreateNewPopup,
        UserService,
        SharedService,
        MaterialsService,
        NewsService,
        FeedbackService,
        MetricsService,
        HealthService,
        ConfigurationService,
        LogsService,
        HomeComponent,
        FeedbackComponent,
        PortfolioComponent,
        MaterialsComponent,
        NewsComponent,
        StudentsComponent,
        ParentsComponent,
        FolderComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(faCoffee);
    }
}
