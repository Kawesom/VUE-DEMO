import AssignmentsList from "./AssignmentsList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default {
  components: { AssignmentsList, AssignmentCreate },

    template: `
    <section class="flex gap-8">
    <assignments-list :assignments="filters.Uncompleted" title="Uncompleted">
    <assignment-create v-on:add="add"></assignment-create>
    </assignments-list>

    <div v-show="showCompleted">
    <assignments-list 
    :assignments="filters.Completed" 
    title="Completed" 
    can-toggle
    @toggle="showCompleted = !showCompleted"
    ></assignments-list>
    
    </div>
    
   </section>
    `, 
    
    data() {
        return {
            assignments: [],
            showCompleted: true
        }
      },
      computed: {
         filters() {
          return {
            Uncompleted: this.assignments.filter(assignment => ! assignment.complete),
            Completed: this.assignments.filter(assignment => assignment.complete),
          }
         }
       },

       created() {
         fetch('http://localhost:3001/assignments')
         .then(response => response.json())
         .then(assignments => {
           this.assignments = assignments //saves it to the data property at the top
         });
       },

       methods: {
        add(name) {
          this.assignments.push({
            name: name,
            completed: false,
            id: this.assignments.length + 1
          });
       
        }
       }
}