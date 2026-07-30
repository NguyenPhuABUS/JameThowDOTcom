import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContestComponent } from './components/admin/contest/contest.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { ContentComponent } from './components/admin/content/content.component';
import { AddContentComponent } from './components/admin/addcontent/addContent.component';
import { contestEntriesComponent } from './components/admin/contestEntries/contestEntries.component';
import { accountInfoComponent } from './components/admin/accountInformation/accoutnInfo.component';
import { AnnouncementComponent } from './components/admin/announcement/announcement.component';
import { addAnnouncementComponent } from './components/admin/announcement/addAnnouncement/addAnoucement.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { contentAdminComponent } from './components/admin/contentAdmin/contentAdmin.component';
import { ContactComponent } from './components/admin/contact/contact.component';
import { AuthGuard } from './services/auth.service';
import { PaymentComponent } from './components/admin/payment/payment.component';
import { ProfileAdminComponent } from './components/admin/profileadmin/profileadmin.component';
import { PackageComponent } from './components/admin/package/package.component';
import { ContestDetailsComponent } from './components/admin/contestDetails/contestDetails.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
        data: {
            roles: 'Admin'
          },
        canActivate: [AuthGuard],
        children : [
            {
                path: 'account-info',
                component: accountInfoComponent
            },
            {
                path: 'payment',
                component: PaymentComponent
            },
            {
                path: 'profileAdmin',
                component: ProfileAdminComponent
            },
            {
                path: 'contest',
                component: ContestComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'contestEntries',
                component: contestEntriesComponent
            },
            {
                path: 'content',
                component: ContentComponent,
                
            },
            {
                path: 'add',
                component: AddContentComponent
            },
            {
                path: 'announcement',
                component: AnnouncementComponent
            },
            {
                path: 'addAnnouncement',
                component: addAnnouncementComponent
            },
            {
                path: 'category',
                component: CategoryComponent
            },
            {
                path: 'contentadmin',
                component: contentAdminComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'package',
                component: PackageComponent
            },
            {
                path: 'contestDetails',
                component: ContestDetailsComponent
            }
        ]
    }
];
