import React, { useState, useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { GetData } from "../../utils/apiRequestHandler";

const Chooseus = () => {
  const [WCUDescription, setWCUDescription] = useState("");
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    GetData("api/cms/46").then((response) => {
      if (mounted.current) {
        if (response.status === true) {
          setWCUDescription(response.CMSData.description);
        } else {
          setWCUDescription('');
        }
      }
    });
    // }

    return () => {
        mounted.current = false;
    };
  }, []);

  if (!WCUDescription) {
    return null;
  }

  // console.log('render')

  return (
    <section className="why-choose-us py-2 my-2 bg-white">
      <div className="container">
        <div className="section-title text-center mb-50">
          <h2>Why Choose Us</h2>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="choose-us-container">
              {" "}
              {WCUDescription.length > 0
                ? ReactHtmlParser(WCUDescription)
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Chooseus);
