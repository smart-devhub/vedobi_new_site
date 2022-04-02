import React, { useState, useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { GetData } from "../../utils/apiRequestHandler";

function Certification() {
  const mounted = useRef(false);
  const [certDescription, setcertDescription] = useState([]);

  useEffect(() => {
    mounted.current = true;
    GetData("api/cms/45").then((response) => {
      if (mounted.current) {
        if (response.status === true) {
          setcertDescription(response.CMSData.description);
        }
      }
    });
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <section className="certification py-3 my-2 bg-white">
        <div className="container">
          <div className="row">{ReactHtmlParser(certDescription)}</div>
        </div>
      </section>
    </>
  );
}

export default React.memo(Certification);
