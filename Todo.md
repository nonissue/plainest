* [x] cache instagram api fetch results
* [x] fetch cached results from fauna
* [ ] intermittenly fetch updated posts info
* [ ] add post hover back
* [ ] store keys in env that is accessible locally/remotely but not in git repo
* [x] fix posts-hydrate
* [ ] get instagram full resolution src for ImageView
* [ ] have ImageView fit to current viewport width
* [ ] implement https://codepen.io/marco_fugaro/pen/mddbOYw on imageview or instagrid or both
* [x] stagger image appearance on load
* [x] have loading component fade in and fade out, and be shown for a minimum amount of time?
* [ ] analytics
* [ ] don't fade in home page when returning from ImageView
* [ ] Move CSS to styled-components so it's inline
* [ ] add hover effect to images

# Bugs

* [x] triggering a second animate event before first one is finished results in frozen ui.
    * Seems to be fixed since reverting to staggered grid loading?
* [ ] Figure out how framer motion actually works
* [x] better implementation of router
