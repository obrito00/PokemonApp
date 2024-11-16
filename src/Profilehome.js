import React from "react";
import line from './line-3.svg';



function Profilehome() {
    return (
        <div >

          {/* insert the red and black background layout */}

          {/* red background layout start */}
          <div className="red-group">
            <div className="red-overlap-group">
              <div className="red-overlap-group-wrapper">
                <div className="red-div">
                  <div className="red-rectangle-2" />
                  <div className="red-rectangle-3" />
                </div>
              </div>
              <div className="red-ellipse" />
              <div className="red-ellipse-2" />
            </div>
          </div>


          {/* red background layout end */}

          {/* black background layout start */}
          <div className="black-div-wrapper">
            <div className="black-overlap-group-2">
              <div className="black-group-2">
                <div className="black-overlap-group-2">
                  <div className="black-rectangle-4" />
                  <div className="black-rectangle-5" />
                </div>
              </div>
              <div className="black-ellipse-3" />
            </div>
          </div>

        {/* black background layout ends */}

          {/* Grey and blue pokeball logo */}
          <div className="grey-pokeball-group">
            <div className="overlap-group">
              <div className="group-wrapper">
                <div className="overlap-group-wrapper">
                  <div className="div">
                    <div className="ellipse" />
                    <img
                      className="line"
                      alt="Line"
                      src={line}
                    />
                  </div>
                </div>
              </div>
              <div className="div-wrapper">
                <div className="overlap-2">
                  <div className="ellipse-2" />
                  <div className="home-text"><a href="/">Home</a> {}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="green-ball" />

            

        </div>
      );
    }
    
    export default Profilehome;

