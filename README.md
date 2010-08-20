## JSONView for Opera

Formats & syntax highlights JSON viewed inside of the web browser! Yay

An Opera port of Jamie Wilkinson's [Chrome port](http://github.com/jamiew/jsonview-chrome) of Ben Hollis' [JSONView extension](http://jsonview.com) for Firefox.

Opera doesn't have extensions so this is merely a UserJS script. ([install instructions](http://userjs.org/help/installation))

You too can enjoy JSON as it was intended:

![prettified JSON](https://addons.mozilla.org/en-US/firefox/images/p/29967/123796716 "JSON + pretty")

## Required Setup

Opera doesn't recognize JSON as plain text and attempts to download it by default. You have to configure Opera to treat JSON like a text file. You can do this with the following steps:

1. Preferences (ctrl+f12)
2. Advanced tab
3. Select downloads
4. Click the Add button
5. Type `application/json` into the Mimetype field
6. Type  `json` into the Extension field
7. Select the Open with Opera option
8. Click Ok for both dialogs

### Illustrated with pictures:

![Figure 1](http://dl.dropbox.com/u/2400/static/linked/jsonview-setup1.png) ![Figure 2](http://dl.dropbox.com/u/2400/static/linked/jsonview-setup2.png)

## Ghetto JSON type detection

Opera doesn't allow scripts to see the mimetype of pages. This script currently runs on every page but exits early if the requirements aren't met.

### Requirements

* Page is in `BackCompat` mode
* The page has a `body` element
* Body contains only 1 element
* The only element in the body is a `pre` tag
* The first character of the body is a `{` or `[`

## Authors

* [Ben Hollis](http://benhollis.net) [@bhollis](http://twitter.com/bhollis) (JSONView Firefox extension) 
* [Jamie Wilkinson](http://jamiedubs.com) [@jamiew](http://twitter.com/jamiew) (Chrome port - extension)
* [Phred Lane](http://my.opera.com/fearphage "I should officially change my name") [@fearphage](http://twitter.com/fearphage) (Opera port - userjs)

MIT Licensed