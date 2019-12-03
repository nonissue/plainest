# Plainest Todo List

## Notes

OH man, when using variants, the children components have to have methods with the same name as the parent dur
(IE. visible, hidden)

## Todos

### General

- [x] cache instagram api fetch results
- [o] button size on mobile
- [ ] Scroll position
- [i] try/catch/error handling
- [x] fix rendering (images on grid start moving around as they appear)
- [x] fix loading indicator placement
- [x] no top padding on image post on mobile
- [x] fetch cached results from fauna
- [x] move back button
- [x] add next/previous buttons to imageview
- [x] make nav fixed for scrolling?
- [ ] testing
- [-] change logo to fixed position square floating above images?
- [ ] intermittenly fetch updated posts info
- [x] fix items exiting (ARE exiting / fading, but not staggering)
- [ ] wireframe loading posts?
- [x] add post hover back
- [x] add links to instagram profiles on about page
- [ ] better back buttons / proper menu
- [ ] store keys in env that is accessible locally/remotely but not in git repo
- [x] fix posts-hydrate
- [ ] get instagram full resolution src for ImageView
- [x] have ImageView fit to current viewport width
- [ ] implement https://codepen.io/marco_fugaro/pen/mddbOYw on imageview or instagrid or both
- [x] stagger image appearance on load
- [x] have loading component fade in and fade out, and be shown for a minimum amount of time?
- [ ] analytics
- [ ] don't fade in home page when returning from ImageView
- [x] Move CSS to styled-components so it's inline
- [x] add hover effect to images
- [ ] TODO: Loading indicator on header lower border?
- [ ] OR top of page?
- [-] make nav just absolute positioned?
- [x] fix nav shift on imageview
- [x] I dunno about the centered nav
- [o] redux
- [o] typescript

### Bugs

- [x] triggering a second animate event before first one is finished results in frozen ui.
  - Seems to be fixed since reverting to staggered grid loading?
- [ ] Figure out how framer motion actually works
- [x] better implementation of router

## Legend

`- [x]` === done
`- [-]` === ignored
`- [o]` === deferred
`- [i]` === in progress
