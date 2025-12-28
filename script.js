    const myRequest = new Request("./data.json");
    const secttag = document.querySelector('.job-list');
    const jobList = document.querySelector(".job-list");
    const filterlist = document.querySelector(".jobfilter-list");
    const clearfilter = document.querySelector(".filter-clear-btn");
    const jobcounter = document.querySelector(".job-count");
    const removefilterbtn = "";
    const selectedCriteria = {
        roles: [] ,
        levels: [] , 
        languages: [],
        tools: []
    };
    let jobfilters = [];
    let jobcount = 0;

    function resetCriteria() {
        selectedCriteria.roles = [];
        selectedCriteria.levels = [];
        selectedCriteria.languages = [];
        selectedCriteria.tools = [];
    }

    clearfilter.addEventListener("click",(e)=>{
        clearfilters();
    })

    // Function to filter jobs based on selected criteria
    function filterJobs(jobs, selectedCriteria) {
        const { roles, levels, languages, tools } = selectedCriteria;
        const hasFilters = (roles && roles.length > 0) || (levels && levels.length > 0) || (languages && languages.length > 0) || (tools && tools.length > 0);
        
        if (!hasFilters) {
            return jobs;
        }

        return jobs.filter(job => {
            const matchesRole = !roles || roles.length === 0 || 
                roles.includes(job.role); 

            const matchesLevel = !levels || levels.length === 0 || 
                levels.includes(job.level); 

            const matchesLanguages = !languages || languages.length === 0 || 
                languages.every(lang => (job.languages ?? []).map(l => l.toLowerCase()).includes(lang.toLowerCase()));

            const matchesTools = !tools || tools.length === 0 || 
                tools.every(tool => (job.tools ?? []).map(t => t.toLowerCase()).includes(tool.toLowerCase()));

            return matchesRole && matchesLevel && matchesLanguages && matchesTools;
        });
    }

    // Fetch job data and render filtered jobs
    function getData() {
        fetch(myRequest)
            .then(response => response.json())
            .then(data => {

                const filteredJobs = filterJobs(data, selectedCriteria);

                jobList.innerHTML = '';  //Clear existing job entries

                for (const jobs of filteredJobs) {
                    jobcount = filteredJobs.length;
                    jobcounter.innerText = jobcount;

                    const jobentry = document.createElement("li");
                    jobentry.setAttribute("data-jobid", `${jobs.id}`)
                    jobentry.classList.add(`job-entry`);
                    jobentry.classList.add('job-sections');
                    jobentry.classList.add(`job-section${jobs.id}`);
                    jobentry.classList.add(`job${jobs.id}`);

                    jobList.appendChild(jobentry);

                    createJobsection(jobs,`${jobs.id}`);

                    const sectlevel = document.querySelector(".tags"+jobs.id);
                    const levelitem = document.createElement("li");
                    levelitem.classList.add('job-section');
                    levelitem.classList.add('sect-tag-item');
                    levelitem.classList.add('sect-level');
                    levelitem.innerHTML = `<button class="filter-tag-btn tag${jobs.id}"  data-type="level" data-tag="${jobs.level}">${jobs.level}</button>`;
                    sectlevel.appendChild(levelitem);

                    if (Array.isArray(jobs.tools)) {
                        const secttools = document.querySelector(".tags"+jobs.id);
                        for (let i = 0; i < jobs.tools.length; i++) {
                            const toolitem = document.createElement("li");
                            toolitem.classList.add('job-section');
                            toolitem.classList.add('sect-tag-item');
                            toolitem.classList.add('sect-tools');
                            toolitem.innerHTML = `<button class="filter-tag-btn tag${jobs.id}"  data-type="tools"  data-tag="${jobs.tools[i]}">${jobs.tools[i]}</button>`;
                            secttools.appendChild(toolitem);
                        }
                    }

                    if (Array.isArray(jobs.languages)) {
                        const sectrole = document.querySelector(".tags"+jobs.id);
                        for (let i = 0; i < jobs.languages.length; i++) {
                            const roleitem = document.createElement("li");
                            roleitem.classList.add('job-section');
                            roleitem.classList.add('sect-tag-item');
                            roleitem.classList.add('sect-lang');
                            roleitem.innerHTML = `<button class="filter-tag-btn tag${jobs.id}" data-type="lang" data-tag="${jobs.languages[i]}">${jobs.languages[i]}</button>`;
                            sectrole.appendChild(roleitem);
                        }
                    }
                
                }
            })
            .catch(console.error);

            secttag.addEventListener("click", (e) => {
                let datatype = "";
                let datatag = "";
                let dataexists = false;

                if(e.target.classList.contains('filter-tag-btn')){
                    datatype = e.target.getAttribute("data-type");
                    datatag = e.target.getAttribute("data-tag");
                    if(jobfilters.length === 0){
                        dataexists = false;
                    }else{
                        jobfilters.forEach((item) => {
                            if(item.tag === datatag) {
                                dataexists = true;
                            }
                        });
                    }
                    
                    if(!dataexists){
                        jobfilters.unshift({type: datatype, tag: datatag});
                        updatejobfilter();
                        getData();
                    }
                }
            });
    }
    getData();
    


    function createJobsection(jobs, entry) {
        const tagnew = jobs.new == true ? "New!" : "";
        const tagfeature = jobs.new == true ? "Featured" : "";

        const newentry = document.querySelector(`.job${entry}`);

        // Add Company Avatar
        const jobsect = document.querySelector(`.job${entry}`);
        const jobsect_avatar = document.createElement("img");
        jobsect_avatar.setAttribute('src', `${jobs.logo}`);
        jobsect_avatar.setAttribute('alt', 'company logo');
        jobsect.append(jobsect_avatar);

        // Add Company Details and Company Tags Section
        const jobsect_details = document.createElement("div");
        jobsect_details.classList.add('sect-job-details');
        jobsect_details.classList.add(`jobdetails${entry}`);
        newentry.append(jobsect_details);

        const jobdetails = document.querySelector(`.jobdetails${entry}`);
        const jobtags = document.querySelector(`.job-section${entry}`);
        jobdetails.innerHTML += `
                    <div class="job-details job-details-sect-1">
                    <span class="job-sect-info info-companyname">${jobs.company}</span>
                    <span class="job-sect-info info-tag info-status" data-new="${jobs.new}">${tagnew}</span>
                    <span class="job-sect-info info-tag info-feature" data-featured="${jobs.featured}">${tagfeature}</span>
                    </div>
                    <div class="job-details job-details-sect-2">
                    <span class="job-sect-info info-position">${jobs.position}</span>
                    </div>
                    <div class="job-details job-details-sect-3">
                    <span class="job-sect-info info-posted">${jobs.postedAt}</span>
                    <span class="job-sect-info info-contract">${jobs.contract}</span>
                    <span class="job-sect-info info-location">${jobs.location}</span>
                    </div>`;
        jobtags.innerHTML +=`
                    <ul id="" class="sect-tags tags${jobs.id}">
                    <li class="job-section sect-tag-item sect-role">
                        <button class="filter-tag-btn" data-type="role"
                        data-tag="${jobs.role}">${jobs.role}</button>
                    </li>
                    </ul>`;
    }

    function updatejobfilter() {
        filterlist.innerHTML = "";
        resetCriteria();
        jobfilters.forEach((item, index) => {
            filterlist.innerHTML += `<li class="filter-item">${item.tag}<button class="filter-remove-btn" id="${index}">X</button></li>`;
            switch (item.type) {
                case "role":
                    selectedCriteria.roles.push(item.tag);
                break;
                case "level":
                    selectedCriteria.levels.push(item.tag);
                break;
                case "lang":
                    selectedCriteria.languages.push(item.tag);
                break;
                case "tools":
                    selectedCriteria.tools.push(item.tag);
                break;
            }
        })
        if(document.querySelector(".filter-remove-btn")){
            const removefilterbtn = document.querySelectorAll(".filter-remove-btn");
            
            removefilterbtn.forEach((removebtn) => {
                removebtn.addEventListener("click", (e) => {
                    removefilter(e);
                });
            });
        }
    }

    function clearfilters() {
        resetCriteria();
        jobfilters = [];
        updatejobfilter();
        getData();
    }

    function removefilter(evt) {
        delete jobfilters[evt.target.id];
        updatejobfilter();
        getData();
    }