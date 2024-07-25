export interface Note {
  id: string
  title: string
  content: string
  progress: 'pending' | 'working' | 'completed'
}
