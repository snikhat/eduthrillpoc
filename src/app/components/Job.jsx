import React, { useEffect, useState, useRef } from "react";
import jobDataJSON from '../json/mockJob.json'
import './Job.css'

const jobData = Object.assign({}, jobDataJSON);

export const Job = () => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showEmptyList, setShowEmptyList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchBy, setSearchBy] = useState('name')
  const [showUpdatePanelistForm, setShowUpdatePanelistForm] = useState(false);
  const [panelistToEdit, setPanelistToEdit] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(jobData.data);
      setIsLoading(false)
    },
      1500)
  }, [])

  useEffect(() => {
    if (searchString.length && searchString.length < 2) {
      setSearchResults(jobData.data)
    }

    if (searchString.length >= 2) {
      try {
        const results = jobData.data.filter(item => item[searchBy && searchBy.length ? searchBy : "name"].toString().toLowerCase().includes(searchString.toLowerCase()));
        setSearchResults(results);
        if (results.length > 0) {
          setShowEmptyList(false);
        } else {
          setShowEmptyList(true);
        }
      } catch (e) {
        console.error("error while searching", e)
      }
    }
  }, [searchString, searchBy])

  // Check for loading flag
  if (isLoading) return <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}><p>Loading...</p></div>

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="title">
          <div>{"Panelists"}</div>
        </div>
        <div style={{ display: 'flex', flex: 1, padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <select style={{ padding: 9, borderWidth: 0, backgroundColor: '#e0e0e0' }} name="search-by" id="search-by" value={searchBy} onChange={event => setSearchBy(event.nativeEvent.target.value)}>
              {
                Object.keys(jobData.data[0]).map((key, index) => <option key={`search-by_item-${index}`} value={key}>Search by {key}</option>)
              }
            </select>
            <input type="text" placeholder="Search panelists" value={searchString} onChange={e => {
              setSearchString(e.nativeEvent.target.value)
            }} />
          </div>
          <button style={{ padding: 8, boxShadow: 'none', }} onClick={() => { setShowUpdatePanelistForm(true) }}>+ Add panelist</button>
        </div>
        <div>
          <table rules="cols" style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <thead>
              <tr style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around', fontWeight: 'bold', backgroundColor: '#a9a9a9' }}>
                <th style={{ flex: 1, padding: 8 }}>Name</th>
                <th style={{ flex: 1.5, padding: 8 }}>E-mail</th>
                <th style={{ flex: 2, padding: 8 }}>Skills</th>
                <th style={{ flex: 0.6, padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ display: 'flex', flexDirection: 'column' }}>
              {
                searchResults && searchResults.length > 0 ? searchResults.map((item, index) => (<tr key={item.email} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <td style={{ flex: 1, padding: 8, }}>{item.name}</td>
                  <td style={{ flex: 1.5, padding: 8, }}>{item.email}</td>
                  <td style={{ flex: 2, padding: 8, }}>{item.skills && item.skills.toString()}</td>
                  <td style={{ flex: 0.6, padding: 8 }}>
                    <button style={{ margin: 8 }} onClick={() => { setPanelistToEdit(item); setShowUpdatePanelistForm(true) }}>Edit</button>
                    <button style={{ margin: 8 }} onClick={() => { jobData.data.splice(index, 1); setSearchResults([...jobData.data]); }}>Delete</button>
                  </td>
                </tr>)) : showEmptyList ? <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 150 }}><p>{`No results, try another ${searchBy === 'skills' ? 'skill' : searchBy}.`}</p></div> : null
              }
            </tbody>
          </table>
        </div>
      </div>
      {showUpdatePanelistForm
        ? <UpdatePanelist
          dismiss={() => { setShowUpdatePanelistForm(false); setPanelistToEdit(null) }}
          addPanelist={panelist => {
            if (panelistToEdit) {
              jobData.data[jobData.data.findIndex(item => item.email === panelist.email)] = panelist;
              setSearchResults([...jobData.data]);
              setPanelistToEdit(null);
            }
            jobData.data.push(panelist);
            setSearchResults([...jobData.data]);
          }}
          panelistToEdit={panelistToEdit}
        />
        : null}
    </div>
  );
};

function UpdatePanelist(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState([]);

  const skillRef = useRef();

  useEffect(() => {
    if (props.panelistToEdit) {
      setName(props.panelistToEdit.name);
      setEmail(props.panelistToEdit.email);
      setSkills(props.panelistToEdit.skills)
    }
  }, [props.panelistToEdit])

  const addSkillOnPressEnter = e => {
    if (skillRef.current.value && e.nativeEvent.code === 'Enter') {
      setSkills(skillsArray => [...skillsArray, skillRef.current.value]);
      setTimeout(() => {
        skillRef.current.value = '';
        skillRef.current.focus();
      }, 0)
    }
  }

  const onSubmit = () => {
    props.addPanelist({
      name,
      email,
      skills
    });
    setTimeout(() => props.dismiss(), 10);
  }

  const onCancel = () => {
    props.dismiss();
  }

  const removeSkill = (index) => {
    const newSkillsList = [...skills]
    newSkillsList.splice(index, 1);
    setSkills(newSkillsList);
  }

  return <div style={{ height: '100%', width: '100%', zIndex: 10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
    <div style={{ width: '35%', backgroundColor: '#fff', boxShadow: '0 0 1px #000', zIndex: 20, borderRadius: 8, display: 'flex', flexDirection: 'column', padding: 16 }}>
      <h2>Add new panelist</h2>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <input style={{ width: '80%', margin: 8, }} type="text" placeholder="Name" value={name} onChange={e => setName(e.nativeEvent.target.value)} />
        <input style={{ width: '80%', margin: 8, }} type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.nativeEvent.target.value)} />
        <input style={{ width: '80%', margin: 8 }} type="text" ref={skillRef} placeholder="Skills" onKeyDown={addSkillOnPressEnter} />
        <div style={{ backgroundColor: '#eeeeee', width: '84%', marginTop: 8, borderRadius: 4, minHeight: 40, padding: 4 }}>
          {
            !skills.length ? 'Add some skills from above' : skills.map((item, index) => <button style={{ margin: 4 }} onClick={() => removeSkill(index)}>{item} x</button>)
          }
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignSelf: 'center', width: '84%', justifyContent: 'space-between' }}>
        <button style={{ boxShadow: 'none', padding: 8, marginTop: 16, backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: 4 }} onClick={onCancel}>Cancel</button>
        <button style={{ boxShadow: 'none', padding: 8, marginTop: 16 }} disabled={!name || !email || !skills.length} onClick={onSubmit}>Submit</button>
      </div>
    </div>
  </div>
}