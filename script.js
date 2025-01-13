const categories =['Frontend','Backend','Fullstack','Junior','Midweight','Senior','Python','Ruby','JavaScript','HTML','CSS','React','Sass','Vue','Django','RoR'];


function getData() {
    const joblist = document.querySelector(".job-list");
    const myRequest = new Request("./data.json");

    fetch(myRequest)
        .then((response) => response.json())
        .then((data) => {
            for (const jobs of data) {
                
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
                            <li class="job-section sect-tag-item sect-role"><button id="tag${jobs.id}" data-tag="${jobs.role}">${jobs.role}</button></li>
                        </ul>
                    <div>
                </section>`;

                joblist.appendChild(jobentry);

                const sectlevel = document.querySelector("#tags"+jobs.id);
                const levelitem = document.createElement("li");
                levelitem.classList.add('job-section');
                levelitem.classList.add('sect-tag-item');
                levelitem.classList.add('sect-level');
                levelitem.innerHTML = `<button id="tag${jobs.id}" data-tag="${jobs.level}">${jobs.level}</button>`;
                sectlevel.appendChild(levelitem);

                if (Array.isArray(jobs.languages)) {
                    const sectrole = document.querySelector("#tags"+jobs.id);
                    for (let i = 0; i < jobs.languages.length; i++) {
                        const roleitem = document.createElement("li");
                        roleitem.classList.add('job-section');
                        roleitem.classList.add('sect-tag-item');
                        roleitem.classList.add('sect-lang');
                        roleitem.innerHTML = `<button id="tag${jobs.id}" data-tag="${jobs.languages[i]}">${jobs.languages[i]}</button>`;
                        sectrole.appendChild(roleitem);
                    }
                }

                if (Array.isArray(jobs.tools)) {
                    const secttools = document.querySelector("#tags"+jobs.id);
                    for (let i = 0; i < jobs.tools.length; i++) {
                        const toolitem = document.createElement("li");
                        toolitem.classList.add('job-section');
                        toolitem.classList.add('sect-tag-item');
                        toolitem.classList.add('sect-tools');
                        toolitem.innerHTML = `<button id="tag${jobs.id}" data-tag="${jobs.tools[i]}">${jobs.tools[i]}</button>`;
                        secttools.appendChild(toolitem);
                    }
                }
            }
        })
        .catch (console.error);
}
getData();