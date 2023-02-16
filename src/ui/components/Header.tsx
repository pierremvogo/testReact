import React from 'react'
import { View,Text } from 'react-native'
import { styled } from "nativewind";
const StyledText = styled(Text);
const StyledView = styled(View);
const Header = () => {
  return (
    <StyledView className=' fixed flex items-center place-items-center bg-blue-600 pt-10 shadow-lg'>
        <StyledText className='h-10 font-bold text-xl text-white '>
            Publications 
        </StyledText>
    </StyledView>
  )
}

export default Header;