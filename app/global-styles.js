import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0px;
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  a {
    text-decoration: none;
    color: #9E9E9E;
  }
  
  a:visited {
    color: #9E9E9E;
  }
  
  a:hover {
    color: #EEEEEE;
  }
  
  :-webkit-autofill,
  :-webkit-autofill:hover, 
  :-webkit-autofill:focus {
    -webkit-text-fill-color: #40C4FF;
    -webkit-box-shadow: 0 0 0px 1000px #212121 inset;
    caret-color: #40C4FF;
  }
  
  .action-button {
    margin: 20px 0;
    width: 100%;
    height: 40px;
    border: 1px solid #40C4FF;
    font-family: Roboto;
    font-weight: 300;
    letter-spacing: 2px;
    color: #40C4FF;
    cursor: pointer;
    
    -webkit-transition: all .1s ease;
    -moz-transition: all .1s ease;
    transition: all .1s ease;
    
    &.spotify {
      width: 50%;
    }
    
    &:hover {
      border: 2px solid #40C4FF;  
    }
    
    &:focus {
      outline: none;
      border: 2px solid #40C4FF;  
    }
    
    &.error {
      border: 1px solid #D50000;
      color: #D50000;
      
      &:hover {
        border: 2px solid #D50000;  
      }
      
      &:focus {
        border: 2px solid #D50000;  
      }
    }
  } 
  
  .iconButton {
    cursor: pointer;
    
    -webkit-transition: all .1s ease;
    -moz-transition: all .1s ease;
    transition: all .1s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
  
  .social-icon {
    width: 25px;
    margin-right: 15px;
  }
`;
