// importuj niezbędne moduły
import { NextApiRequest, NextApiResponse } from 'next';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

// Definiuj funkcję obsługi żądania
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Sprawdź, czy metoda żądania to DELETE
  if (req.method === 'DELETE') {
    try {
      // Utwórz klienta Supabase z odpowiednimi ciasteczkami
      const supabase = createServerActionClient({ cookies: () => req.cookies });

      // Pobierz użytkownika
      const { data: { user } } = await supabase.auth.getUser();
      
      // Sprawdź, czy użytkownik jest zalogowany
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Pobierz id wiadomości do usunięcia z ciała żądania
      const { messageId } = req.body;

      // Usuń wiadomość z bazy danych Supabase
      const { data, error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) {
        return res.status(500).json({ error: 'Failed to delete message' });
      }

      // Zwróć sukces
      return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Obsługa nieprawidłowych metod żądania
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
