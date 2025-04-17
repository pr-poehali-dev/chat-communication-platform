
import { useState } from 'react';
import { Mic, Volume2, Speaker, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface AudioSettingsProps {
  onClose?: () => void;
}

const AudioSettings = ({ onClose }: AudioSettingsProps) => {
  // Состояния для настроек аудио
  const [inputDevice, setInputDevice] = useState('default');
  const [outputDevice, setOutputDevice] = useState('default');
  const [micVolume, setMicVolume] = useState(75);
  const [outputVolume, setOutputVolume] = useState(80);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [testingMic, setTestingMic] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  // Имитация списка устройств
  const inputDevices = [
    { id: 'default', name: 'Микрофон по умолчанию' },
    { id: 'mic-1', name: 'Встроенный микрофон' },
    { id: 'mic-2', name: 'Внешний микрофон (USB)' },
    { id: 'mic-3', name: 'Гарнитура Logitech G Pro X' },
  ];

  const outputDevices = [
    { id: 'default', name: 'Динамики по умолчанию' },
    { id: 'speaker-1', name: 'Встроенные динамики' },
    { id: 'speaker-2', name: 'Внешние динамики (HDMI)' },
    { id: 'speaker-3', name: 'Гарнитура Logitech G Pro X' },
  ];

  // Имитация тестирования микрофона
  const startMicTest = () => {
    setTestingMic(true);
    const interval = setInterval(() => {
      setMicLevel(Math.random() * 100);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setTestingMic(false);
      setMicLevel(0);
    }, 5000);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Настройки звука</h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Устройство ввода</h3>
          <Select value={inputDevice} onValueChange={setInputDevice}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите микрофон" />
            </SelectTrigger>
            <SelectContent>
              {inputDevices.map(device => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <Label>Громкость микрофона</Label>
              <span>{micVolume}%</span>
            </div>
            <Slider 
              value={[micVolume]} 
              onValueChange={(values) => setMicVolume(values[0])} 
              max={100} 
              step={1}
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <Label>Тест микрофона</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={startMicTest}
                disabled={testingMic}
              >
                {testingMic ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                {testingMic ? " Тестирование..." : " Начать тест"}
              </Button>
            </div>
            
            {testingMic && (
              <div className="mt-2">
                <div className="w-full h-2 bg-muted rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-100" 
                    style={{ width: `${micLevel}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Устройство вывода</h3>
          <Select value={outputDevice} onValueChange={setOutputDevice}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите динамики" />
            </SelectTrigger>
            <SelectContent>
              {outputDevices.map(device => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <Label>Громкость динамиков</Label>
              <span>{outputVolume}%</span>
            </div>
            <Slider 
              value={[outputVolume]} 
              onValueChange={(values) => setOutputVolume(values[0])} 
              max={100} 
              step={1}
            />
          </div>

          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Проверить звук
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Дополнительные настройки</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="noise-suppression">Шумоподавление</Label>
            <Switch 
              id="noise-suppression" 
              checked={noiseSuppression} 
              onCheckedChange={setNoiseSuppression} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="echo-cancellation">Подавление эха</Label>
            <Switch 
              id="echo-cancellation" 
              checked={echoCancellation} 
              onCheckedChange={setEchoCancellation} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-gain">Автоматическая регулировка громкости</Label>
            <Switch 
              id="auto-gain" 
              checked={autoGainControl} 
              onCheckedChange={setAutoGainControl} 
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={onClose}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;
