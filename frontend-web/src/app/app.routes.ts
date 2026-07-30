import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { layoutComponent } from './layout.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesDetailsComponent } from './recipes/details/details.component';
import { ContactUsComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ChangePasswordComponent } from './account/changePassword/changePassword.component';
import { RecipePostedComponent } from './recipes/recipePosted/recipePosted.component';
import { ContestListComponent } from './contest/list/contest-list.component';
import { ContestDetailsComponent } from './contest/details/contest-details.component';
import { SubscriptionComponent } from './payment/app-subscription/subscription.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { HistoryComponent } from './payment/Transaction History/history.component';

export const routes: Routes = [
    {
        path: '',
        component: layoutComponent,
        children:[
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'recipes',
                component: RecipesComponent
            },
            {
                path: 'recipes-details',
                component: RecipesDetailsComponent
            },
            {
                path: 'contactus',
                component: ContactUsComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'changePassword',
                component: ChangePasswordComponent
            },
            {
                path: 'recipePosted',
                component: RecipePostedComponent  
            },
            {
                path: 'contestList',
                component: ContestListComponent  
            },
            {
                path: 'contestDetails',
                component: ContestDetailsComponent  
            },
            {
                path: 'subscription',
                component: SubscriptionComponent  
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent
            },
            {
                path: 'history',
                component: HistoryComponent
            }
        ]
    }
];
