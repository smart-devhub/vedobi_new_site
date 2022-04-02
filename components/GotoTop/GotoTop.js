import { useEffect } from "react"
//import { useLocation } from "react-router-dom";

function GotoTop() {

  //const routePath = useLocation();

  const onTop = () => {
    window.scrollTo(0, 0);
  }
  
  useEffect(() => {
    onTop()
  }, []);


  return null
}

export default GotoTop
