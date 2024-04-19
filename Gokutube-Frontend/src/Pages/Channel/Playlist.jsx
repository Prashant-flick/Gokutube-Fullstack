import React from 'react'
import { Playlists } from '../../Components'

function Playlist() {
  window.addEventListener('popstate', function(event) {
    // Your event handling code here
    window.location.reload()
  });
  return (
    <Playlists />
  )
}

export default Playlist
