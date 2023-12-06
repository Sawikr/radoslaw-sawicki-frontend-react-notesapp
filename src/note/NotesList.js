import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {getLogoutToken, isUserLoggedIn, logout, logoutToken} from '../service/LoginService';
import NotesService from '../service/NotesService';
import CategoryService, {getUpdatedCategoryToken, saveCategory, updatedCategoryToken} from '../service/CategoryService';
import Space from '../element/Space';
import SortNotesService from '../service/SortNotesService';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';
import {useOnceEffect} from '../config/UseDevEffect';
import {getNavbarToken, navbarToken} from '../service/NavbarService';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const username = sessionStorage.getItem('authenticatedUser');
    const [loginUsername, setLoginUsername] = useState(username);
    const [categoryTrue, setCategoryTrue] = useState(false);
    const [logFirst, setLogFirst] = useState(false);
    const [error, setError] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState(false);
    const [errorUpdatedCategory] = useState(false);
    let [isUpdatedCategory, setIsUpdatedCategory] = useState(getUpdatedCategoryToken());
    let [isLogout, setIsLogout] = useState(getLogoutToken());
    const [logoutForm, setLogoutForm] = useState(false);
    const [counter, setCounter] = useState(0);
    const history = useHistory();
    const isAuth = isUserLoggedIn();
    let isHome = getNavbarToken();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    useOnceEffect (async () => {
        if (category === null) {
            setCategory(await getSaveCategory());
            setCounter(2);
        }
        if (isLogout === null) {
            logoutToken(false);
        }
        if (isUpdatedCategory === null) {
            updatedCategoryToken(false);
        }
        if (isHome === null) {
            navbarToken(false);
        }

        if (isAuth) {
            isLogout = getLogoutToken();
            isUpdatedCategory = getUpdatedCategoryToken();
            isHome = getNavbarToken();
            NotesService.getAll()
                .then(async response => {
                    //console.log('Printing response!', response.data);
                    setNotes(response.data);
                    setLoading(false);

                    if (isLogout.match(false)) {
                        isHome = getNavbarToken();
                        if (isUpdatedCategory.match(true) && counter === 0) {
                            setCounter(1);
                            setUpdatedCategory(true);
                            await wait(4500);
                            setUpdatedCategory(false);
                            setNewCategory(true);
                            await wait(3000);
                            setNewCategory(false);
                            updatedCategoryToken(false);
                            navbarToken(false);
                        }
                        if (isUpdatedCategory.match(false) && counter === 2) {
                            if (isHome.match(false)) {
                                setNewCategory(true);
                                await wait(5000);
                                setNewCategory(false);
                                setCounter(1);
                            }
                        }
                    }
                    else if (isLogout.match(true)) {
                        setLogoutForm(true);
                        await wait(3000);
                        setLogoutForm(false);
                        setLoading(true);
                        await logout();
                        //alert("Logged out successfully!");
                        history.push("/radoslaw-sawicki-frontend-react-notesapp");
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        }
        else {
            //alert("Log in first!");
            setLogFirst(true);
            await wait(4500);
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }

    }, [loading, isLogout, isUpdatedCategory, counter]);

    async function getSaveCategory() {
        CategoryService.getAll()
            .then(async response => {
                //console.log('Printing response!', response.data);
                let foundCategory = response.data.filter(obj => {
                    return obj.username === loginUsername})
                    .findLast(obj => {return obj}).categoryName;

                if (foundCategory) {
                    setCategory(foundCategory);
                    console.log('Saved category is: ' + foundCategory + '!');
                    return category;
                }
                else {
                    //alert('Set the category of notes displayed!');
                    setCategoryTrue(true);
                    await wait(4500);
                    setCategoryTrue(false);
                }
            })
            .catch(async error => {
                console.log('An error occurred!', error);
                //alert("An error occurred!");
                setError(true);
                await wait(4000);
            })
    }

    async function saveSelectedCategory() {
        saveCategory(category);
        setUpdatedCategory(updatedCategory);
        console.log('Selected category is: ' + category + '!');
    }

    return (
        <div className="main-content">
            <div className="text-md-left">
                {
                    categoryTrue &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Set the category of notes displayed!</span>
                        </div>
                    </Alert>
                }
                {
                    error || errorUpdatedCategory &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> An error occurred!</span>
                        </div>
                    </Alert>
                }
                {
                    logFirst &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Log in first!</span>
                        </div>
                    </Alert>
                }
                {
                    newCategory &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Saved category is
                            <span className="text-uppercase" style={{color: '#79589f'}}> {category}!</span>
                        </div>
                    </Alert>
                }
                {
                    updatedCategory &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Category updated successfully!</div>
                    </Alert>
                }
                {
                    logoutForm &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Logged out successfully!</span>
                        </div>
                    </Alert>
                }
                {
                    (categoryTrue || error || errorUpdatedCategory || logFirst || newCategory || updatedCategory || logoutForm) &&
                    <Space />
                }
            </div>
            {loading ? (
                <div className="loader-container" style={{marginTop: 77}}>
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
                <div className="main-content">
                    <h4 className="text-center">List of Notes</h4>
                    <Space/>
                    <div className="text-center">
                        <select
                            id="category"
                            className="main-category"
                            style={{cursor: "pointer"}}
                            value={category}
                            onClick={saveSelectedCategory}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">All categories</option>
                            <option value="blogging">Blogging</option>
                            <option value="congregation">Congregation</option>
                            <option value="circuit">Circuit</option>
                            <option value="meeting">Meeting</option>
                            <option value="programming">Programming</option>
                            <option value="other">Other</option>
                            <option value="vacation">Vacation</option>
                        </select>
                    </div>
                    <div className="notes-list mt-4">
                        {
                            <SortNotesService
                                notes={notes}
                                category={category}
                            />
                        }
                    </div>
                    <Space/>
                </div>
            )}
        </div>
    );
}

export default NotesList;