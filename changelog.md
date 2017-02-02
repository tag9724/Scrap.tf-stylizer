# Changelog

## 09 June 2016

**v1.0.0**

- Options : added custom notification sound
- Options : added custom background
- Options : added "dark theme" checkbox
- Message preview on creating raffle
- BBCODE buttons and chars counter on the same section
- Reserve all buttons added on partswap section
- Added reclaimed items counter on ended raffles

**v1.0.1**

- Fixed bug : multi language for reclaimed items counter on ended raffles
- Removed ugly padding on comments section (dark theme)
- Preview message background set #f7f9fa

**v1.0.2**

- Removed partswap reservation ( asked by an scrap.tf admin )

## 11 June 2016

**v1.0.3**

- Improved filters in weapons / skins / stranges banking

**v1.0.4**

- fixed bug : chat settings don't appear

**v1.0.5**

- fixed bug : some items don't appear with new filters

**v1.0.6**

- fixed bug : slots filters array debugged
- prevent bug : added config version
- added filters for user backpack ( items selection payement )

## 15 June 2016

**v1.0.7**

- Fixed bug with blur in Dark theme mode
- Added favorite raffle button / page / nav menu ( datas saved in local )
- Added "unlimitedStorage" permission

**v1.0.8**

- Added preview emoticon ( Create raffle section )
- Fixed buggy selector ( DisplayFavoritesRaffles.js )

**v1.0.8**

- Fixed margin-top on favorites raffles page

## 17 June 2016

**v1.0.9**

- Added BBCODE for no white-listed links on raffles descriptions
- All links appears at clickable on raffles descriptions ( in red color )
- Added export btn on favorites raffles page

**v1.1.0**

- Better comments box on raffles ( css injected )
- Hover event on these comments, colored indication on linked and other user comments
- BBCODE applied in live on comment raffle section ( Scrap.tf bug resolved )
- Non white-listed links in the same section was clickable now

**v1.1.1**

- Removed background(2n) replaced by border-top in comments raffle section
- Fixed selector on hover event in comment section

## 20 June 2016

**v1.1.2**

- Fixed red urls in raffles
- Fixed comment section style for the Dark theme
- Added hidden text btn on create raffle section
- Added disbale tip btn on create raffle section
- Fixed bug BBCODE btn on create raffle section disappear
- Hidens text fixed on raffles
- Possibility to save a template of your raffle ( create raffle section )

## 21 June 2016

**v1.1.3**

- Removed text-align justify in raffle.css ( meh )
- Now available for Opera
- Better comment section added for profiles

**v1.1.4**

- Options popup redesigned
- Reduced .zip size ( .git filder excluded )
- Background config saved in local now
- Can add a local background in config
- Background no longer appears delayed with the page loading

**v1.1.5**

- Kappa icon parsed ( create raffle only )
- Fixed bug on loading puzzle raffle template, all inputs appear now
- Added the level filter on weapons/hats/items/stranges banking
- Custom banking search are now on weapons/skins/hats/items/stranges/killstreaks banking

**v1.1.6**

- Kappa emote is totally parsed now
- White background on puzzle raffle message
- Fixed query search match not only the item name now
- Added loading gif on the duplicated checkbox
- Fixed minor bug on level filter

**v1.1.7**

- Bug fixed, filters don't be launched

**v1.1.8**

- Query search fixed
- level filter on strange banking

## 04 July 2016

**v1.1.9**

- Bug dark theme not applied on announcement
- Bug dark theme solution button on puzzle not appear
- Minimalist stats on profiles
- Clean after maj : main.js & background.js

## 27 August 2016

**v1.2.0**

- Bug user id not saved on profile stats
- Updated scraptf emotes list ( BBCODE parser )
- Reduced images size
- Reduced mp3 size
- HTML CSS JS files minified
- Converted .ttf in .woff2
- Removed Background and dark theme features
- Added the template management

## 29 August 2016

**v1.2.1**

- Added shortlink to backpack.tf for all bots
- Sound are saved in local now ( firefox compatibility )
- Some parts of code rewrite for firefox
- Added permission for backpack.tf ( js/banking.js )

## 30 August 2016

**v1.2.2**

- Replaced tab permission by activeTab
- autocomplete input max level in filters
- Fixed sound for chrome & opera
- Fixed some ui element with custom theme

## 08 September 2016

**v1.2.3**

- Deleted old config files
- Added short link to polls history and announcement
- Fixed bot-list.js for stranges
- Fixed bug : trying to add filters on the wrong page
- Template not applied on announcement
- raffle.css and profile.css replaced by global.css
- bug template.css solution button don't appear
- Injected style tag before template.css on main.js
- Reduced size : Open-Sans font ( 60Ko => 5Ko )
- Added import feature on favorites raffles page
- Stop minify .css anymore
- Added help page for CustomCSS with templates

## 12 September 2016

**v1.2.4**

- Fixed some UI bugs with template.css
- Added "DOM constructor" class ( Firefox aprobation )
- Replaced innerHTML by BuildDOM in : displaySavedCreateRaffle.js, templates-selection.js,
  googleFont.js, display.js, saveTemplate.js, DisplayFavoritesRaffle.js  

- Saved raffles items was saved as JSON object ( previously saved as HTML string )
- Replaced innerHTML by innerText for simple text inject ( style and script tag content also )
- Escaped variables in main.js ( svg content )
- Deleted useless image ( loading.gif )
- Modified manifest.json for adding constructDOM.js and move DisplayFavoritesRaffles.js in a better place
- Fixed banking.js matches in manifest.json ( firefox )
- Readapted "DOMContentLoaded" event on some files for firefox
- Fixed font url in help.css, he's no longer trying to load a .tff than a .woff2

## 14 September 2016

**v1.2.5**

- Replaced all innerText by textContent ( more performant )
- Improved performances for filters
- Saved in localstorage the user inventory for filters
- Level filters "keyup" event for input changed for "input"
- Filters fixed bug select "multi" remove selected class on slots buttons
- Fixed UI bug on filters : hover on classes and slot buttons
- Fixed bug in filters : items not displayed on validated trade page
- Fixed bug with BuildDOM on raffle with main.js

## 04 October 2016

**v1.2.6** | ScrapTF raffle update

- Added Background css variables  
- Replaced innerHTML by BuildDOM in : profileStats.js
- Fixed preview raffle message and text-formating buttons when creating puzzle raffle ( createRaffle.js )
- Fixed custom UI ( createRaffle.css )
- Fixed bug load raffle panel disappear on missclick
- Load saved raffle work again ( displaySavedCreateRaffle.js )
- Save button appear also on loading saved raffle ( displaySavedCreateRaffle.js )

## 08 October 2016

**v1.2.7** | ScrapTF auction update

- Fixed UI bugs ( template.css )
- Added list of TF2 items ( def-index : name | items-shema.js )
- Added shortlink to backpack.tf for items in auction ( auction-backpack-tf.js )
- Updated banking.js and BuildDOM ( function BpLink reusable for auction )
- Removed background script ( used for removing old custom background setting )

## 09 October 2016

**v1.2.8**

- Fixed backpack.tf auction links for quality "Haunted"
- Fixed backpack.tf auction links for killstreak weapons
- Fixed backpack.tf auction links for killstreak kits
- Fixed backpack.tf auction links for Strange decorated weapons
- Comment box max-height fixed on auction
- Added backpack.tf shortlink on auction main pages
- ScrapTF UI bug : overflow on .container-margin, .panel-raffle
- Fixed UI bug with template.css on search page

## 18 November 2016

**v1.2.9** | 1M users event

- Fixed backpack.tf auction links for renamed decorated weapons
- Fixed backpack.tf auction links for ' char on killstreak kits
- Fixed UI bugs with template.css
- Moved bot-list.js and items-shema.js to js/JSON/ folder
- Clear main.js ( sound conf sync => local )
- Fixed bug : save raffle ( createRaffle.js )
- Fixed create raffles features
- Updated items-shema.js

## 29 November 2016

**v1.2.9.1** | Little fix

- Fixed extras raffles menus

## 25 January 2017

**v1.3.0** | Happy new Year

- Updated items-shema.js
- Updated ScrapTF emotes list
- New BBCODE system implemented
- Youtube videos preview on raffles was replaced by iframes
- Fixed UI bugs with template.css
- Removed profile stats feature 
- Background.js added for cleaning old profiles stats
- Added permissions for youtube.com and youtu.be
- Merged inject.js with injectMulti.js
- Text editors ( CK-Editor ) are now resizable vertically
- Raffle owner comments are easy to distinguish now
- Puzzle raffle message are no longer parsed with BB-Code.js ( raffle.js )
- Clean up the manifest.json
- Bug fixed : loaded raffle message not injected on new CK-Editor ( createRaffle.js )
- Bug fixed : Save raffle template don't save enter message and raffle content ( createRaffle.js )
- Bug fixed : name and date don't appear on favorite raffles page ( DisplayFavoritesRaffles.js ) 
- Bug fixed : ended raffle don't show number of reclaimed items

## 30 January 2017

**v1.3.1**

- Updated emotes list
- Fixed BBCODE parsed on puzzle without any template used

## 01 February 2017

**v1.3.2** | RIP popup

- Replaced config popup by a complete webpage ( merged with the template manager )
- Multiple tabs opened when trading will no longer play the notification sound multiple time
- Possibility to set the volume of the notification sound
- Bug fixed : Moovistrip don't appear on puzzles raffle