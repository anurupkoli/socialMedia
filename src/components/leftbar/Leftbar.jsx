import React from "react";
import "./leftbar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from '@mui/icons-material/Chat';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';

export default function Leftbar() {
  return (
    <>
      <div className="leftBarWrapper">
        <div className="leftBarFeeds">
          <ul>
            <li className="leftBarFeedItems">
              <RssFeedIcon />
              <span>Feed</span>
            </li>
            <li className="leftBarFeedItems">
              <ChatIcon />
              <span>Chats</span>
            </li>
            <li className="leftBarFeedItems">
              <SmartDisplayIcon />
              <span>Videos</span>
            </li>
            <li className="leftBarFeedItems">
              <Diversity1Icon />
              <span>Groups</span>
            </li>
            <li className="leftBarFeedItems">
              <BookmarksIcon />
              <span>Bookmarks</span>
            </li>
            <li className="leftBarFeedItems">
              <HelpIcon />
              <span>Questions</span>
            </li>
            <li className="leftBarFeedItems">
              <WorkIcon />
              <span>Jobs</span>
            </li>
            <li className="leftBarFeedItems">
              <EventAvailableIcon />
              <span>Events</span>
            </li>
            <li className="leftBarFeedItems">
              <SchoolIcon />
              <span>Cources</span>
            </li>
          </ul>
          <button className="btn" >Show More</button>
        </div>
        <hr /> 
        <div className="leftBarFriends">
            <ul>
                <li className="leftBarFriend">
                    <img src="" alt="" />
                    <span>Friend1</span>
                </li>
                <li className="leftBarFriend">
                    <img src="" alt="" />
                    <span>Friend1</span>
                </li>
                <li className="leftBarFriend">
                    <img src="" alt="" />
                    <span>Friend1</span>
                </li>
                <li className="leftBarFriend">
                    <img src="" alt="" />
                    <span>Friend1</span>
                </li>
                <li className="leftBarFriend">
                    <img src="" alt="" />
                    <span>Friend1</span>
                </li>
                <li className="leftBarFriend">
                    <img src="" alt="" />
                    <span>Friend1</span>
                </li>
            </ul>
        </div>
      </div>
    </>
  );
}
