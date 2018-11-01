import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { GeneratorComponent } from './generator/generator.component';
import { ControlsComponent } from './controls/controls.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormWizardComponent } from './forms/form-wizard/form-wizard.component';
import { AutofocusDirective } from './_lib/AutofocusDirective';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostTabLabelComponent } from './post/post-tab-label/post-tab-label.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './_lib/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { PostService } from './post/post.service';
import { FooterComponent } from './footer/footer.component';
import { COMPLETION_PROVIDERS, MonacoEditorModule } from 'ngx-monaco';
import { KubernetesCompletionService } from './_lib/editor/kubernetes-completion.service';
import { PostComponent } from './post/post.component';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { SharedModule } from './shared/shared.module';

@NgModule({

    declarations: [

        AppComponent,

        AutofocusDirective,

        ControlsComponent,
        EditorComponent,
        GeneratorComponent,
        FormWizardComponent,
        PostComponent,
        HomeComponent,
        PostTabLabelComponent,
        HeaderComponent,
        CallbackComponent,
        FooterComponent,

    ],

    imports: [

        BrowserModule,
        BrowserAnimationsModule,


        RouterModule.forRoot([

            {

                path: 'home/:tab',
                component: HomeComponent

            }, {

                path: 'callback',
                component: CallbackComponent

            }, {

                path: 'authorize',
                component: CallbackComponent

            }, {

                path: 'oauth/callback',
                component: CallbackComponent

            }

        ], { enableTracing: false }),


        LoginModule,
        SharedModule,

        // AngularSplitModule,
        MonacoEditorModule.forRoot(),
        NgProgressModule,
        ToastrModule.forRoot({

            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
            enableHtml: true,
            closeButton: true

        }),

    ],

    entryComponents: [

        FormWizardComponent,
        PostComponent

    ],

    providers: [

        {

            provide: HTTP_INTERCEPTORS,
            useClass: NgProgressInterceptor,
            multi: true

        },
        {

            provide: COMPLETION_PROVIDERS,
            useClass: KubernetesCompletionService,
            multi: true

        },

        AuthService,
        LoginService,
        PostService,

    ],

    bootstrap: [AppComponent]

})
export class AppModule {
}
