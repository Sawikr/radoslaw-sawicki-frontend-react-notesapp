import {useParams} from 'react-router-dom';
import {Menu} from '@mui/base/Menu';
import {MenuItem, menuItemClasses} from '@mui/base/MenuItem';
import {MenuButton} from '@mui/base/MenuButton';
import CategoryService, {getCategory, setCategoryToken, updatedCategoryToken} from '../service/CategoryService';
import {Dropdown} from '@mui/base/Dropdown';
import {BsGear} from 'react-icons/bs';
import {logoutToken} from '../service/LoginService';
import {useState} from 'react';
import {getNoteCreatingDateToken, noteCreatingDateClickToken, noteCreatingDateToken} from '../service/NoteCreatingDateService';
import {useNavigate} from 'react-router';

const SettingsMenu = () => {
    let [categoryName, setCategoryName] = useState('');
    const loginUsername = sessionStorage.getItem('authenticatedUser');
    let [username, setUsername] = useState(loginUsername);
    let [noteCreatedDateIsTrue, setNoteCreatedDateIsTrue] = useState(getNoteCreatingDateToken());
    const [updatedCategory, setUpdatedCategory] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    const createHandleMenuClick = (menuItem) => {
        if (menuItem === 'Set category') {
            return () => {
                console.log(`Clicked on: ${menuItem}!`);
                //alert('Category set: ' + getCategory().toUpperCase() + '!');
                setCategoryToken(true);
                updatedCategoryToken(false);

                categoryName = getCategory();
                const category = {id, categoryName, username};

                CategoryService.createCategory(category)
                    .then(async () => {
                        console.log('Updated category is: ' + categoryName + '!');
                        console.log('Updated username is: ' + username + '!');
                        //alert("Category updated successfully!");
                        await notesList();
                        //console.log('createCategory: ' + updatedCategory);
                    })
                    .catch(error => {
                        console.log('An error occurred!', error);
                        //alert("An error occurred!");
                    })
            };
        }
        else if (menuItem === 'Note creating date') {
            return () => {
                noteCreatingDateClickToken(true);
                console.log(`Clicked on: ${menuItem}!`);
                if (noteCreatedDateIsTrue === null || noteCreatedDateIsTrue.match(false)) {
                    noteCreatingDateToken(true);
                    setNoteCreatedDateIsTrue(true);
                    //alert('Note creation date display enabled!');
                    window.location.reload();
                }
                else if (noteCreatedDateIsTrue.match(true)) {
                    noteCreatingDateToken(false);
                    setNoteCreatedDateIsTrue(false);
                    //alert('Note creation date display disabled!');
                    window.location.reload();
                }
                console.log('Note creation date is set to ' + getNoteCreatingDateToken() + '!');
            };
        }
        else if (menuItem === 'Log out') {
            return async () => {
                console.log(`Clicked on: ${menuItem}!`);
                await logoutForm();
            };
        }
    }

    async function notesList() {
        updatedCategoryToken(true);
        setUpdatedCategory(true);
        window.location.reload();
    }

    async function logoutForm() {
        logoutToken(true);
        navigate("/notes/list");
        window.location.reload();
    }

    return (
        <Dropdown>
            <MenuButton className="text-right" style={{marginLeft: 5, marginRight: -10, background: 'white'}}>
                <BsGear className="TriggerButtonIntroduction" style={{fontSize: "1.2em"}}/>
            </MenuButton>
            <Menu
                className="CustomMenuIntroduction"
                slotProps={{
                    listbox: {className: 'CustomMenuIntroduction--listbox'},
                }}
            >
                <MenuItem
                    className="CustomMenuIntroduction--item"
                    onClick={createHandleMenuClick('Set category')}
                >
                    Set category
                </MenuItem>
                <MenuItem
                    className="CustomMenuIntroduction--item"
                    onClick={createHandleMenuClick('Note creating date')}
                >
                    Note creating date
                </MenuItem>
                <MenuItem
                    className="CustomMenuIntroduction--item"
                    onClick={createHandleMenuClick('Log out')}
                >
                    Log out
                </MenuItem>
            </Menu>
            <Styles/>
        </Dropdown>
    );
}

function Styles() {
    return (
        <style>{`
        .CustomMenuIntroduction--listbox {
          max-width: 200px;
          padding: 10px;
          margin: 3px;
          text-align: left;
          margin-left: -140px;
          border-radius: 5px;
          border-color: white;
          overflow: auto;
          outline: auto;
          background: #f4f4f4;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
          color: #79589f;
          outline-color: white;
        }

        .CustomMenuIntroduction--item {
          padding: 0px;
          border-radius: 0px;
          color: #79589f;
          cursor: pointer;
        }
    
        .CustomMenuIntroduction--item:last-of-type {
          border-bottom: none;
        }
    
        .CustomMenuIntroduction--item.${menuItemClasses.focusVisible} {
          background-color: grey;
          color: white;
        }
    
        .CustomMenuIntroduction--item.${menuItemClasses.disabled} {
          color: #79589f;
        }
    
        .CustomMenuIntroduction--item:hover:not(.${menuItemClasses.disabled}) {
          background-color: grey;
          color: white;
        }
    
        .TriggerButtonIntroduction {
          margin: 0;
          font-family: "Ubuntu", serif;
          padding: 0 auto;
          cursor: pointer;
          background: white;
          align-items: center;
        
          &:hover {
            border-radius: 5px;
            margin-bottom: 1px;
            border: 1px solid #79589f;
          }
        
          &:active {
            border-color: #79589f;
          }
        
          &:focus-visible {
            outline: none;
          }
        }
        
        .CustomMenuIntroduction {
          z-index: 1;
        }
    `}</style>
    );
}

export default SettingsMenu;