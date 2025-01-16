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
    function getData() {
        fetch(myRequest)
            .then(response => response.json())
            .then(data => {
                const selectedCriteria = {
                    role: '', // Replace with actual selected role
                    level: '', // Replace with actual selected level
                    languages: [], // Replace with actual selected languages
                    tools: [] // Replace with actual selected tools
                };

                const filteredJobs = filterJobs(data, selectedCriteria);

                const joblist = document.querySelector(".job-list");
                joblist.innerHTML = ''; // Clear existing job entries

                for (const jobs of filteredJobs) {
                    const tagnew = jobs.new == true ? "New!" : "";
                    const tagfeature = jobs.new == true ? "Featured" : "";

                    const jobentry = document.createElement("li");
                    jobentry.setAttribute("data-jobid", `${jobs.id}`)
                    jobentry.classList.add('job-entry');

                    jobentry.innerHTML = `
                    <section class="job-sections">
                        <img src="${jobs.logo}" alt="">
                        <div class="sect-job-details">    
                            <div class="job-details r1">
                                <span class="job-sect-info info-companyname">${jobs.company}</span>
                                <span class="job-sect-info info-tag job-status" data-new="${jobs.new}">${tagnew}</span>
                                <span class="job-sect-info info-tag job-feature" data-featured="${jobs.featured}">${tagfeature}</span>
                            </div>
                            <div class="job-details r2">
                                <span class="job-sect-info info-posistion">${jobs.position}</span>
                            </div>
                            <div class="job-details r3">
                                <span class="job-sect-info info-posted">${jobs.postedAt}</span>
                                <span class="job-sect-info info-contract">${jobs.contract}</span>
                                <span class="job-sect-info info-location">${jobs.location}</span>
                            </div>    
                        </div>
                        <div class="job-details r4">
                            <ul id="tags${jobs.id}" class="sect-tags">
                                <li class="job-section sect-tag-item sect-role">
                                    <button id="tag${jobs.id}" class="filter-tag-btn" data-type="role" data-tag="${jobs.role}">${jobs.role}</button>
                                </li>
                            </ul>
                        </div>
                    </section>`;

                    joblist.appendChild(jobentry);

                    const sectlevel = document.querySelector("#tags"+jobs.id);
                    const levelitem = document.createElement("li");
                    levelitem.classList.add('job-section');
                    levelitem.classList.add('sect-tag-item');
                    levelitem.classList.add('sect-level');
                    levelitem.innerHTML = `<button id="tag${jobs.id}" class="filter-tag-btn"  data-type="level" data-tag="${jobs.level}">${jobs.level}</button>`;
                    sectlevel.appendChild(levelitem);

                    if (Array.isArray(jobs.tools)) {
                        const secttools = document.querySelector("#tags"+jobs.id);
                        for (let i = 0; i < jobs.tools.length; i++) {
                            const toolitem = document.createElement("li");
                            toolitem.classList.add('job-section');
                            toolitem.classList.add('sect-tag-item');
                            toolitem.classList.add('sect-tools');
                            toolitem.innerHTML = `<button id="tag${jobs.id}" class="filter-tag-btn"  data-type="tools"  data-tag="${jobs.tools[i]}">${jobs.tools[i]}</button>`;
                            secttools.appendChild(toolitem);
                        }
                    }

                    if (Array.isArray(jobs.languages)) {
                        const sectrole = document.querySelector("#tags"+jobs.id);
                        for (let i = 0; i < jobs.languages.length; i++) {
                            const roleitem = document.createElement("li");
                            roleitem.classList.add('job-section');
                            roleitem.classList.add('sect-tag-item');
                            roleitem.classList.add('sect-lang');
                            roleitem.innerHTML = `<button id="tag${jobs.id}" class="filter-tag-btn" data-type="lang" data-tag="${jobs.languages[i]}">${jobs.languages[i]}</button>`;
                            sectrole.appendChild(roleitem);
                        }
                    }
                }
            })
            .catch(console.error);
            

            sectTag.addEventListener("click", (e) => {
                if(e.target.classList.contains('filter-tag-btn')){
                    console.log(e.target);
                }
            });
    }

    getData();
    
// });

