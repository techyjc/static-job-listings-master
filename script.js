// document.addEventListener('DOMContentLoaded', () => {
    const myRequest = new Request("./data.json");
    const sectTag = document.querySelector('.job-list');

    // Function to filter jobs based on selected criteria
    function filterJobs(jobs, selectedCriteria) {
        const { role, level, languages, tools } = selectedCriteria;

        // Check if all criteria are empty
        const noCriteria = !role && !level && (!languages || languages.length === 0) && (!tools || tools.length === 0);

        if (noCriteria) {
            return jobs;
        }

        return jobs.filter(job => {
            const matchesRole = !role || job.role.toLowerCase() === role.toLowerCase();
            const matchesLevel = !level || job.level.toLowerCase() === level.toLowerCase();
            const matchesLanguages = !languages || languages.length === 0 || languages.every(lang => job.languages.map(l => l.toLowerCase()).includes(lang.toLowerCase()));
            const matchesTools = !tools || tools.length === 0 || tools.every(tool => job.tools.map(t => t.toLowerCase()).includes(tool.toLowerCase()));

            return matchesRole && matchesLevel && matchesLanguages && matchesTools;
        });
    }

    // Fetch job data and render filtered jobs
    // function getData() {
    //     fetch(myRequest)
    //         .then(response => response.json())
    //         .then(data => {
    //             const selectedCriteria = {
    //                 role: '', // Replace with actual selected role
    //                 level: '', // Replace with actual selected level
    //                 languages: [], // Replace with actual selected languages
    //                 tools: [] // Replace with actual selected tools
    //             };
                
    //             // selectedCriteria.role="Frontend";
    //             // selectedCriteria.tools.push("React");

    //             const filteredJobs = filterJobs(data, selectedCriteria);

    //             const joblist = document.querySelector(".job-list");
    //             joblist.innerHTML = ''; // Clear existing job entries

    //             for (const jobs of filteredJobs) {
    //                 const tagnew = jobs.new == true ? "New!" : "";
    //                 const tagfeature = jobs.new == true ? "Featured" : "";

    //                 const jobentry = document.createElement("li");
    //                 jobentry.setAttribute("data-jobid", `${jobs.id}`)
    //                 jobentry.classList.add('job-entry');

    //                 jobentry.innerHTML = `
    //                 <section class="job-sections">
    //                     <img src="${jobs.logo}" alt="">
    //                     <div class="sect-job-details">    
    //                         <div class="job-details r1">
    //                             <span class="job-sect-info info-companyname">${jobs.company}</span>
    //                             <span class="job-sect-info info-tag job-status" data-new="${jobs.new}">${tagnew}</span>
    //                             <span class="job-sect-info info-tag job-feature" data-featured="${jobs.featured}">${tagfeature}</span>
    //                         </div>
    //                         <div class="job-details r2">
    //                             <span class="job-sect-info info-posistion">${jobs.position}</span>
    //                         </div>
    //                         <div class="job-details r3">
    //                             <span class="job-sect-info info-posted">${jobs.postedAt}</span>
    //                             <span class="job-sect-info info-contract">${jobs.contract}</span>
    //                             <span class="job-sect-info info-location">${jobs.location}</span>
    //                         </div>    
    //                     </div>
    //                     <div class="job-details r4">
    //                         <ul id="tags${jobs.id}" class="sect-tags">
    //                             <li class="job-section sect-tag-item sect-role">
    //                                 <button id="tag${jobs.id}" class="filter-tag-btn" data-type="role" data-tag="${jobs.role}">${jobs.role}</button>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </section>`;

    //                 joblist.appendChild(jobentry);

    //                 const sectlevel = document.querySelector("#tags"+jobs.id);
    //                 const levelitem = document.createElement("li");
    //                 levelitem.classList.add('job-section');
    //                 levelitem.classList.add('sect-tag-item');
    //                 levelitem.classList.add('sect-level');
    //                 levelitem.innerHTML = `<button id="tag${jobs.id}" class="filter-tag-btn"  data-type="level" data-tag="${jobs.level}">${jobs.level}</button>`;
    //                 sectlevel.appendChild(levelitem);

    //                 if (Array.isArray(jobs.tools)) {
    //                     const secttools = document.querySelector("#tags"+jobs.id);
    //                     for (let i = 0; i < jobs.tools.length; i++) {
    //                         const toolitem = document.createElement("li");
    //                         toolitem.classList.add('job-section');
    //                         toolitem.classList.add('sect-tag-item');
    //                         toolitem.classList.add('sect-tools');
    //                         toolitem.innerHTML = `<button id="tag${jobs.id}" class="filter-tag-btn"  data-type="tools"  data-tag="${jobs.tools[i]}">${jobs.tools[i]}</button>`;
    //                         secttools.appendChild(toolitem);
    //                     }
    //                 }

    //                 if (Array.isArray(jobs.languages)) {
    //                     const sectrole = document.querySelector("#tags"+jobs.id);
    //                     for (let i = 0; i < jobs.languages.length; i++) {
    //                         const roleitem = document.createElement("li");
    //                         roleitem.classList.add('job-section');
    //                         roleitem.classList.add('sect-tag-item');
    //                         roleitem.classList.add('sect-lang');
    //                         roleitem.innerHTML = `<button id="tag${jobs.id}" class="filter-tag-btn" data-type="lang" data-tag="${jobs.languages[i]}">${jobs.languages[i]}</button>`;
    //                         sectrole.appendChild(roleitem);
    //                     }
    //                 }
    //             }
    //         })
    //         .catch(console.error);
            

    //         sectTag.addEventListener("click", (e) => {
    //             if(e.target.classList.contains('filter-tag-btn')){
    //                 console.log(e.target);
    //             }
    //         });
    // }

    // getData();
    
// });

function createJobdetails(){
    const joblist = document.querySelector(".job-list");
    const jobsects = document.createElement("section");
    const jobsect_avatar = document.createElement("img");
    const jobsect_detailswrapper = document.createElement("div");
    const jobsect_subsect = document.createElement("div");
    const jobsect_companyname = document.createElement("span");
    const jobsect_new = document.createElement("span"); 
    const jobsect_feature = document.createElement("span");
    const jobsect_position = document.createElement("span");
    const jobsect_posted = document.createElement("span");
    const jobsect_contract = document.createElement("span");
    const jobsect_location = document.createElement("span");
    const jobsect_tags = document.createElement("ul");
    const jobsect_role = document.createElement("li");
    const jobsect_level = document.createElement("li");
    const jobsect_tools = document.createElement("li");
    const jobsect_languages = document.createElement("li");

    jobsects.classList.add('job-sections');
    jobsect_avatar.setAttribute('src', 'images/photosnap.svg');
    jobsect_avatar.setAttribute('alt', 'company logo');
    jobsect_detailswrapper.classList.add('sect-job-details');
    jobsect_subsect.classList.add('job-details');
    jobsect_companyname.classList.add('job-sect-info');
    jobsect_new.classList.add('job-sect-info');
    jobsect_new.classList.add('info-tag');
    jobsect_new.classList.add('job-status');
    jobsect_new.setAttribute('data-new', 'true');
    jobsect_new.textContent = 'New!';
    jobsect_feature.classList.add('job-sect-info');
    jobsect_feature.classList.add('info-tag');
    jobsect_feature.classList.add('job-feature');
    jobsect_feature.setAttribute('data-featured', 'true');
    jobsect_feature.textContent = 'Featured';
    jobsect_position.classList.add('job-sect-info');
    jobsect_position.classList.add('info-posistion');
    jobsect_position.textContent = 'Senior Frontend Developer';
    jobsect_posted.classList.add('job-sect-info');
    jobsect_posted.classList.add('info-posted');
    jobsect_posted.textContent = '1d ago';
    jobsect_contract.classList.add('job-sect-info');
    jobsect_contract.classList.add('info-contract');
    jobsect_contract.textContent = 'Full Time';
    jobsect_location.classList.add('job-sect-info');
    jobsect_location.classList.add('info-location');
    jobsect_location.textContent = 'USA Only';
    jobsect_tags.classList.add('sect-tags');
    jobsect_role.classList.add('job-section');
    jobsect_role.classList.add('sect-tag-item');
    jobsect_role.classList.add('sect-role');
    jobsect_role.innerHTML = `<button class="filter-tag-btn" data-type="role" data-tag="Frontend">Frontend</button>`;
    joblist.appendChild(jobsects);
    jobsects.appendChild(jobsect_avatar);
    jobsects.appendChild(jobsect_detailswrapper);
    jobsect_detailswrapper.appendChild(jobsect_subsect);
    jobsect_subsect.appendChild(jobsect_companyname);
    jobsect_subsect.appendChild(jobsect_new);
    jobsect_subsect.appendChild(jobsect_feature);
    jobsect_subsect.appendChild(jobsect_position);
    jobsect_subsect.appendChild(jobsect_posted);
    jobsect_subsect.appendChild(jobsect_contract);
    jobsect_subsect.appendChild(jobsect_location);
    jobsect_subsect.appendChild(jobsect_tags);
    jobsect_tags.appendChild(jobsect_role);
    jobsect_tags.appendChild(jobsect_level);
    jobsect_tags.appendChild(jobsect_tools);
    jobsect_tags.appendChild(jobsect_languages);


}

createJobdetails();