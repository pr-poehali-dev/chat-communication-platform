
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, MessageSquare, Users, Image, Paw } from 'lucide-react';

interface FurryLandingProps {
  onEnterApp: () => void;
}

const FurryLanding = ({ onEnterApp }: FurryLandingProps) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen w-full bg-[#0D0D15] text-white overflow-hidden relative">
      {/* Фоновые анимированные элементы */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0D0D15] via-[#131342] to-[#170D26] opacity-90"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#5639E4] rounded-full filter blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#39E4E4] rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Сетка кибер-стиля */}
      <div className="absolute inset-0 z-0 grid grid-cols-12 grid-rows-12 gap-4 p-4 opacity-25">
        {Array.from({ length: 144 }).map((_, index) => (
          <div key={index} className="border border-cyan-500/20 rounded"></div>
        ))}
      </div>

      {/* Основной контент */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl h-screen flex flex-col">
        {/* Хедер */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Paw className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-wider">
              <span className="text-cyan-400">Furry</span>Connect
            </h1>
          </div>
          
          <nav>
            <ul className="flex gap-6 items-center">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Сообщество</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Галерея</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Контакты</a></li>
              <li>
                <Button 
                  variant="default" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-none"
                  onClick={onEnterApp}
                >
                  Войти <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
            </ul>
          </nav>
        </header>

        {/* Основной контент */}
        <main className="flex-1 flex">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            {/* Левая колонка - информация */}
            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight">
                Объединяем <span className="text-cyan-400">фурри</span> сообщество в цифровом пространстве
              </h2>
              
              <p className="text-lg text-gray-300">
                Присоединяйтесь к нашему сообществу, общайтесь в чатах, обменивайтесь искусством и находите новых друзей в безопасном пространстве для всех фурри.
              </p>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-none text-lg py-6 px-8" 
                  onClick={onEnterApp}
                >
                  Начать общение
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-900/20 text-lg py-6 px-8"
                >
                  Узнать больше
                </Button>
              </div>
              
              <div className="flex gap-8 mt-8">
                <div>
                  <p className="text-3xl font-bold text-cyan-400">10K+</p>
                  <p className="text-gray-400">Участников</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-400">500+</p>
                  <p className="text-gray-400">Серверов</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-400">50K+</p>
                  <p className="text-gray-400">Сообщений в день</p>
                </div>
              </div>
            </div>
            
            {/* Правая колонка - изображение */}
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-cyan-500/50 shadow-2xl">
                  <img 
                    src="https://cdn.poehali.dev/files/d79f123a-ece2-404a-81e0-65a025ccdff3.jpg" 
                    alt="Неоновый фурри-персонаж" 
                    className="w-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>

        {/* Функциональность */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Наши возможности</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-cyan-500/30 overflow-hidden group">
              <CardContent className="p-6">
                <div className="mb-4 bg-cyan-500/20 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <MessageSquare className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Текстовые и голосовые чаты</h3>
                <p className="text-gray-400">Общайтесь в текстовых каналах или подключайтесь к голосовым для живого общения с другими участниками.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-cyan-500/30 overflow-hidden group">
              <CardContent className="p-6">
                <div className="mb-4 bg-cyan-500/20 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Тематические сообщества</h3>
                <p className="text-gray-400">Создавайте или присоединяйтесь к тематическим серверам для общения с единомышленниками.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-cyan-500/30 overflow-hidden group">
              <CardContent className="p-6">
                <div className="mb-4 bg-cyan-500/20 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <Image className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Обмен искусством</h3>
                <p className="text-gray-400">Делитесь своим творчеством, получайте отзывы и находите вдохновение в работах других участников.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Подвал */}
        <footer className="mt-auto pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">© 2023 FurryConnect. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Условия использования</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Поддержка</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FurryLanding;
