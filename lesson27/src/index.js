'use strict'

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'fetch-polyfill';
import 'es6-promise';

import calc from './modules/calc';
import photos from './modules/photos';
import countTimer from './modules/countTimer';
import togglePopUp from './modules/togglePopUp';
import slCarousel from './modules/sliderCarousel';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import valid from './modules/validator';
import toggleMenu from './modules/toggleMenu';

/*****   TIMER   *****/
countTimer('5 april  2020');

/*****   MENU  *****/
toggleMenu();

/*****   PopUp  *****/
togglePopUp();

/*****   TABS   *****/
tabs();

/*****   SLIDER   *****/
slider();

/*****   OUR TEAM   *****/
photos();

/*****  CAROUSEL   *****/
slCarousel();

/*****   CALCULATE   *****/
calc(100);

/*****   SEND-FORM  *****/
sendForm();

/*****   VALIDATOR   *****/
valid();