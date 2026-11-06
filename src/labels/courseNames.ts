export function formatCourseName(course: string): string {
    return course.toUpperCase().replace(/^ELENG(\d+)$/, "ELENG $1");
}
