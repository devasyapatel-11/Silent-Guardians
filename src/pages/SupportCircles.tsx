
import React from 'react';
import { useSupportCircles } from '@/hooks/useSupportCircles';
import SupportCircleCard from '@/components/support/SupportCircleCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupportCircle } from '@/types';

const SupportCircles = () => {
  const { supportCircles, isLoading, joinCircle, isJoining } = useSupportCircles();

  const filterCirclesByType = (type: SupportCircle['type'] | 'all') => {
    if (type === 'all') return supportCircles;
    return supportCircles.filter(circle => circle.type === type);
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-medium mb-2">Support Circles</h1>
        <p className="text-muted-foreground">
          Join anonymous groups focused on specific topics and concerns.
          All conversations are end-to-end encrypted and auto-deleted.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="domestic-violence">Domestic</TabsTrigger>
          <TabsTrigger value="workplace-harassment">Workplace</TabsTrigger>
          <TabsTrigger value="legal-guidance">Legal</TabsTrigger>
          <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
          <TabsTrigger value="financial-independence">Financial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading support circles...</p>
          ) : (
            filterCirclesByType('all').map(circle => (
              <SupportCircleCard 
                key={circle.id} 
                circle={circle} 
                onJoin={joinCircle} 
                isJoining={isJoining}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="domestic-violence" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCirclesByType('domestic-violence').map(circle => (
            <SupportCircleCard 
              key={circle.id} 
              circle={circle} 
              onJoin={joinCircle} 
              isJoining={isJoining}
            />
          ))}
        </TabsContent>

        <TabsContent value="workplace-harassment" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCirclesByType('workplace-harassment').map(circle => (
            <SupportCircleCard 
              key={circle.id} 
              circle={circle} 
              onJoin={joinCircle} 
              isJoining={isJoining}
            />
          ))}
        </TabsContent>

        <TabsContent value="legal-guidance" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCirclesByType('legal-guidance').map(circle => (
            <SupportCircleCard 
              key={circle.id} 
              circle={circle} 
              onJoin={joinCircle} 
              isJoining={isJoining}
            />
          ))}
        </TabsContent>

        <TabsContent value="mental-health" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCirclesByType('mental-health').map(circle => (
            <SupportCircleCard 
              key={circle.id} 
              circle={circle} 
              onJoin={joinCircle} 
              isJoining={isJoining}
            />
          ))}
        </TabsContent>

        <TabsContent value="financial-independence" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCirclesByType('financial-independence').map(circle => (
            <SupportCircleCard 
              key={circle.id} 
              circle={circle} 
              onJoin={joinCircle} 
              isJoining={isJoining}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportCircles;
