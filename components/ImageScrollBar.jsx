import React, {useContext} from 'react'
import Image from 'next/image'
import {Box, Icon, Flex} from '@chakra-ui/react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const LeftArrow = () => {
    const {scrollPrev} = useContext(VisibilityContext)

    return (<Flex justifyContent="center" alignItems="center" marginRight="1">
       {window.innerWidth >= 600 && <Icon as={FaArrowAltCircleLeft} onClick={() => scrollPrev()} fontSize="2xl" cursor="pointer" /> }
    </Flex>)
}

const RightArrow = () => {
    const {scrollNext} = useContext(VisibilityContext)
    
    return (<Flex justifyContent="center" alignItems="center" marginLeft="1">
       {window.innerWidth >= 600 && <Icon as={FaArrowAltCircleRight} onClick={() => scrollNext()} fontSize="2xl" cursor="pointer" /> }
    </Flex>)
}


function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
  
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

export default function ImageScrollBar({images}) {
  

  
    return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow: 'hidden'}} >
        {images?.map((image) => (
            <Box width="910px" key={image?.id} itemID={image?.id} overflow='hidden'>
                <Image alt='' placeholder='blur' blurDataURL={image?.url} src={image?.url} width={1000} height={500} sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"/>
            </Box>
        ))}
    </ScrollMenu>)
}
