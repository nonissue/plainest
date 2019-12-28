# Plainest Todo List

## Notes

- OH man, when using variants, the children components have to have methods with the same name as the parent dur (IE. visible, hidden)
- Modal stuff:

  - https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/
    - Note: uses router rather than react portal?
  - https://alligator.io/react/modal-component/
  - https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/
  - https://reacttraining.com/react-router/web/example/modal-gallery
  - https://codesandbox.io/s/react-router-modal-gallery-se6ry
  - https://codedaily.io/tutorials/77/Create-a-Modal-Route-with-React-Router
  - https://codepen.io/aesthetickz/pen/pYywpJ
  - https://levelup.gitconnected.com/build-a-modal-using-react-context-portals-and-hooks-bd0c4e54537e
  - https://codesandbox.io/s/app-store-ui-using-react-and-framer-motion-ecgc2
  - https://codesandbox.io/s/7w6mq72l2q?from-embed

  Other inspo:

  https://blog.sethcorker.com/page-transitions-in-react-router-with-framer-motion/
  https://codesandbox.io/s/framer-motion-x-react-router-n7qhp
  https://reacttricks.com/animating-next-page-transitions-with-framer-motion/
  https://codesandbox.io/s/2wp1zoj09j
  https://next-motion.heruc.now.sh

## Todos

### General

Legend:

```
- [x] === done
- [-] === ignored
- [o] === deferred
- [i] === in progress
- [c] === cancelled
```

#### New Grid stuff

- [x] Image doesn't move back properly (exit animation starts inside original container)
- [ ] dark mode
- [ ] accessibility concerns of body-scroll-lock?
- [x] add way to dismiss modal on escape press
- [x] weird flash when closing (I think related to overlay ++ zIndex)
- [ ] handle data fetching here or in App? Can't think of a way to render error component from here
- [ ] full res insta images https://stackoverflow.com/questions/31302811/1080x1080-photos-via-instagram-api
  - see instagramapiresponse.json
- [x] prevent scroll on ios (if scroll is initiated before modal is shown, content still scrollable briefly)
- [ ] I think this is fixed with body-scroll-lock package
- [ ] scroll restoration?
- [x] implement loading
- [ ] add next/prev
- [ ] add view on insta link
- [x] center images vertically
- [x] set point of interest (added object-position to better center the images)
- [x] images on close are obscured by other grid images, will fix
- [x] fix image sizing finally...
- [x] disable scrolling when isSelected
- [x] fix grid flashing
- [x] adjust overlay timing, since grid post animation isn't a static time
      because it varies based on distance
- [x] looks weird going behind header (zindex)
- [x] remove unused CSS
      = [x] do components need to use react memo? yes for perf boost
- [x] fix about
- [x] if we visit grid item directly, it fucks up zIndex aft
- [x] fix posts being refetched anytime params change

#### General

- [ ] reassess goals
- [ ] migrate everything to github issues
- [ ] testing
- [ ] see ./components/newGrid for latest stuff
- [ ] style ig post link properly
- [x] cache instagram api fetch results
- [x] move grid to actual css grid
- [c] get insta tags and link em
- [x] Logo moves on viewing postview
- [c] simplyify / remove as much as possible
- [c] reimplement postview next/prev
- [x] do modal
- [x] fix about icon, it sucks
- [ ] get some kind of transition for PostView -> Grid
- [x] review stuff from framer motion app store clone and implement
- [ ] blur up for images?
- [x] on modal click, soft redirect?
  - can use window.pushHistory or something
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
- [-] change logo to fixed position square floating above images?
- [ ] intermittenly fetch updated posts info
- [x] fix items exiting (ARE exiting / fading, but not staggering)
- [ ] wireframe loading posts?
- [x] add post hover back
- [x] add links to instagram profiles on about page
- [x] better back buttons / proper menu
- [x] store keys in env that is accessible locally/remotely but not in git repo
- [x] fix posts-hydrate
- [ ] get instagram full resolution src for ImageView
- [x] have ImageView fit to current viewport width
- [ ] implement https://codepen.io/marco_fugaro/pen/mddbOYw on imageview or instagrid or both
- [x] stagger image appearance on load
- [x] have loading component fade in and fade out, and be shown for a minimum amount of time?
- [ ] analytics
- [x] don't fade in home page when returning from ImageView
- [x] Move CSS to styled-components so it's inline
- [x] add hover effect to images
- [ ] change loading indicator to header lower border? OR top of page?
- [x] make nav just absolute positioned?
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
