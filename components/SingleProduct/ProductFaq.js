import React from "react";
import ReactHtmlParser from "react-html-parser";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import NoData from "../NoData/NoData";
import { useSelector } from "react-redux";

const ProductFaq = () => {
   const singleProduct = useSelector((state) => state.products.singleProduct);
  if(!singleProduct ){
    return null;
  }


  return (
    <>
   {singleProduct?.FAQ.length > 0 ?	
      <div className="pro-detail-faq">
        <div className="row">
            <div className="container">
            
              <Accordion  allowZeroExpanded>

                { singleProduct?.FAQ.map((data) => {
                  return (
                    <AccordionItem key={data.id} uuid={data.id}>
                      <AccordionItemHeading>
                        <AccordionItemButton>{data.title}</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div align="left">{ReactHtmlParser(data.description)}</div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
          </div>
		  :
		  <NoData />
   }
    </>
  );
};

export default React.memo(ProductFaq);
