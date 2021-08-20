import React from 'react'
import styled from 'styled-components'
// icons
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import BusinessIcon from '@material-ui/icons/Business'
import PeopleIcon from '@material-ui/icons/People'
import WorkIcon from '@material-ui/icons/Work'
import MailIcon from '@material-ui/icons/Mail'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import {IsLogged, FirstName, LastName, Email, AccountUid, Avatar} from '../redux/actions'
import { useHistory } from 'react-router-dom'
function Header() {

    const dispatch = useDispatch()
    const avatar = useSelector(state => state?.UserInfo?.avatar)
    const history = useHistory()

    let avatarSrc;

    if(auth.currentUser){
        avatarSrc = avatar
    } 


    
    
    const signOut = () => {
        history.push('/login')
        auth.signOut()
        dispatch(FirstName(''))
        dispatch(LastName(''))
        dispatch(Email(''))
        dispatch(AccountUid(null))
        dispatch(IsLogged(false))  
        dispatch(Avatar(''))
    }

    const renderToHomePage = () => {
      if (auth.currentUser) {
        history.push('/')
      }
    }
    
    return (
        <BigContainer>
            <Container>
                <LogoParent onClick={renderToHomePage}>
                    <Logo src='./images/logo.svg'/>
                </LogoParent>
                <Searching>
                    <input type="text" />
                    <SearchIconWrapper>
                        <SearchIcon style={{fontSize: 23, color: '#1d1d1d'}} />
                    </SearchIconWrapper>
                </Searching>
                <SectionsIcons>
                    <IconWrapper>
                        <Icon>
                            <HomeIcon style={{fontSize: 25}}/>
                        </Icon>
                        <IconTitle>Home</IconTitle>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <LocationCityIcon style={{fontSize: 25}} />
                        </Icon>
                        <IconTitle>Companies</IconTitle>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <BusinessIcon style={{fontSize: 25}} />
                        </Icon>
                        <IconTitle>Projects</IconTitle>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <PeopleIcon style={{fontSize: 25}} />
                        </Icon>
                        <IconTitle>Profiles</IconTitle>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <WorkIcon style={{fontSize: 25}} />
                        </Icon>
                        <IconTitle>Jobs</IconTitle>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <MailIcon style={{fontSize: 25}} />
                        </Icon>
                        <IconTitle>Messages</IconTitle>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <NotificationsIcon style={{fontSize: 25}} />
                        </Icon>
                        <IconTitle>Notifications</IconTitle>
                    </IconWrapper>
                </SectionsIcons>
                <Info onClick={signOut}>
                    {avatarSrc?(
                        <ProfileImg src={avatarSrc}/>
                    ) : (
                        <AccountCircleIcon />
                    )}
                </Info>
            </Container>
        </BigContainer>
    )
}

export default Header

const BigContainer = styled.div`
    background: var(--main-color);
`

const Container = styled.div`
    height: 50px;
    color:  white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: auto;
`

const LogoParent = styled.div`
    width: 100px;
    cursor: pointer;
`

const Logo = styled.img`
    width: 100%;
`

const Searching = styled.div`
    display: flex;

    input {
        height: 28px;
        width: 170px;
        outline: none;
        border: 1px solid #eee;
        border-radius: 5px 0 0 5px;
    }
`

const SearchIconWrapper = styled.div`
    background: #eee;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border-radius: 0px 5px 5px 0px;
`

const SectionsIcons = styled.div`
    display: flex;
    font-size: 14px;
`

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8px;
`

const Icon = styled.div``

const IconTitle = styled.span``

const Info = styled.div`
    width: 35px;
    overflow: hidden;
`

const ProfileImg = styled.img`
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
`


