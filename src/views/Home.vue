<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Report Table</h2>
    <template v-if="isStudent">
      <table class="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 py-2 px-4">Student Name</th>
            <th class="border border-gray-300 py-2 px-4">Group</th>
            <th class="border border-gray-300 py-2 px-4">Subject</th>
            <th class="border border-gray-300 py-2 px-4">Average Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in studentReports" :key="index">
            <td class="border border-gray-300 py-2 px-4">{{ report.full_name }}</td>
            <td class="border border-gray-300 py-2 px-4">{{ report.group }}</td>
            <td class="border border-gray-300 py-2 px-4">{{ report.subject }}</td>
            <td class="border border-gray-300 py-2 px-4">{{ report.average_grade }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-else>
      <table class="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 py-2 px-4">Group</th>
            <th class="border border-gray-300 py-2 px-4">Subject</th>
            <th class="border border-gray-300 py-2 px-4">Average Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in teacherReports" :key="index">
            <td class="border border-gray-300 py-2 px-4">{{ report.group }}</td>
            <td class="border border-gray-300 py-2 px-4">{{ report.subject }}</td>
            <td class="border border-gray-300 py-2 px-4">{{ report.average_grade }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface StudentReport {
  full_name: string;
  group: string;
  subject: string;
  average_grade: number;
}

interface TeacherReport {
  group: string;
  subject: string;
  average_grade: number;
}

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isStudent = store.state.user?.is_student;
    const studentReports = reactive<StudentReport[]>([]);
    const teacherReports = reactive<TeacherReport[]>([]);

    onMounted(async () => {
      const isAuthenticated = store.state.authenticated;
      const token = store.state.token;

      if (isAuthenticated && token) {
        try {
          if (isStudent) {
            const studentId = store.state.user?.id;
            const studentResponse = await fetch(`http://127.0.0.1:8000/api/reports/student/${studentId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            if (studentResponse.ok) {
              const studentData: StudentReport[] = await studentResponse.json();
              studentReports.push(...studentData);
              console.log(studentData);
            } else {
              console.error('Failed to fetch student reports data');
            }
          } else {
            const teacherResponse = await fetch('http://127.0.0.1:8000/api/reports/group/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            if (teacherResponse.ok) {
              const teacherData: TeacherReport[] = await teacherResponse.json();
              teacherReports.push(...teacherData);
            } else {
              console.error('Failed to fetch teacher reports data');
            }
          }
        } catch (error) {
          console.error('Error occurred while fetching reports data:', error);
        }
      } else {
        router.push('/login');
      }
    });

    return {
      isStudent,
      studentReports,
      teacherReports,
    };
  },
};
</script>