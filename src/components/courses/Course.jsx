import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../../App.css';
import { generateApiUrl } from '../../utils/generateApiUrl';

export function Course() {
    const { slug, courseId } = useParams();
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('loading');
    const [course, setCourse] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await fetchCourse();
          }
          fetchData();
    }, []);

    async function fetchCourse() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`departments/${slug}/courses/${courseId}`));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setCourse(json);
            setState('data');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }

    async function removeCourse() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`departments/${slug}/courses/${courseId}`), {
                method: 'DELETE'
            });
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            setState('deleted');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }

    if (state === 'error') {
        return (
            <p>Villa að sækja áfanga</p>
        );
    }

    if (state === 'loading') {
        return (
            <p>Sæki áfanga</p>
        );
    }

    if (state === 'deleted') {
        return (
            <>
                <p>Áfangi fjarlægður</p>
                <Link to={`/departments/${slug}/courses`}>Til baka að sjá áfanga deildar</Link>
            </>
        );
    }


    return (
        <section>
            <h2>{course.title}</h2>
            <table>
                <tr>
                    <th>Áfanganúmer</th>
                    <th>Einingar</th>
                    <th>Önn</th>
                    <th>Námsleið</th>
                    <th>Hlekkur á áfanga</th>
                </tr>
                <tr>
                    <td>{course.courseId}</td>
                    <td>{course.units}</td>
                    <td>{course.semester}</td>
                    <td>{course.level}</td>
                    <td><Link to={course.url} className="App-link">{course.url}</Link></td>
                </tr>
            </table>
            <div>
                <Link to={`/departments/${slug}/courses/`}>Aftur til baka</Link>
            </div>            
            <div>
                <p></p>
            </div>
            <button onClick={removeCourse} className="remove-button">Fjarlægja deild</button>
        </section>
    )
}