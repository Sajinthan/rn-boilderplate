import { AlertTriangle, Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';
import { type Session, type SessionOutcome, useSessionStore } from '@/stores/session-store';

/**
 * History Tab - Session History Screen
 * Displays a summary card with today/week stats, filter chips,
 * and a chronological list of past focus sessions.
 */

type FilterOption = 'today' | 'week';

const filterLabels: Record<FilterOption, string> = {
  today: 'Today',
  week: '7 days',
};

const filterSummaryLabels: Record<FilterOption, string> = {
  today: 'Today',
  week: 'This week',
};

/**
 * Format an ISO date string to "h:mm AM/PM" format
 */
const formatSessionTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHour}:${displayMinutes} ${ampm}`;
};

/**
 * Get the lucide icon component for a given session outcome
 */
const getOutcomeIcon = (outcome: SessionOutcome) => {
  switch (outcome) {
    case 'completed':
      return Check;
    case 'partial':
      return AlertTriangle;
    case 'not_completed':
      return X;
  }
};

export default function HistoryScreen() {
  const colors = useColors();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('today');

  // Session store selectors
  const getTodaySessions = useSessionStore(state => state.getTodaySessions);
  const getWeekSessions = useSessionStore(state => state.getWeekSessions);
  const getTodayStats = useSessionStore(state => state.getTodayStats);
  const getWeekStats = useSessionStore(state => state.getWeekStats);

  // Derive data based on active filter
  const sessions = activeFilter === 'today' ? getTodaySessions() : getWeekSessions();
  const stats = activeFilter === 'today' ? getTodayStats() : getWeekStats();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="min-h-full px-6 py-12">
        {/* Header */}
        <View className="mb-8 pt-4">
          <Text className="text-title font-medium text-foreground">History</Text>
        </View>

        {/* Summary Card */}
        <View className="mb-8 rounded-xl bg-muted p-6">
          <Text className="mb-1 text-helper text-muted-foreground">{filterSummaryLabels[activeFilter]}</Text>
          <Text className="text-title text-foreground">
            {stats.completed}
            <Text className="font-normal text-muted-foreground"> / {stats.total}</Text>
          </Text>
          <Text className="mt-1 text-helper text-muted-foreground">sessions completed</Text>
        </View>

        {/* Filter Chips */}
        <View className="mb-6 flex-row gap-2">
          {(Object.keys(filterLabels) as FilterOption[]).map(filter => (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.7}
              onPress={() => setActiveFilter(filter)}
              className={cn('rounded-lg px-4 py-2', activeFilter === filter ? 'bg-primary' : 'bg-muted')}
            >
              <Text
                className={cn(
                  'text-sm font-medium',
                  activeFilter === filter ? 'text-primary-foreground' : 'text-muted-foreground',
                )}
              >
                {filterLabels[filter]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Session List or Empty State */}
        {sessions.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-body text-muted-foreground">No sessions yet</Text>
          </View>
        ) : (
          <View>
            {sessions.map((session: Session, index: number) => {
              const Icon = getOutcomeIcon(session.outcome);
              const isLast = index === sessions.length - 1;

              return (
                <View
                  key={session.id}
                  className={cn('flex-row items-center justify-between py-4', !isLast && 'border-b border-border')}
                >
                  {/* Left: Task info */}
                  <View className="flex-1 pr-4">
                    <Text className="text-body font-medium text-foreground" numberOfLines={1}>
                      {session.taskName}
                    </Text>
                    <Text className="text-helper text-muted-foreground">{formatSessionTime(session.startTime)}</Text>
                  </View>

                  {/* Right: Outcome icon */}
                  <View className="ml-4 h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon size={16} color={colors.mutedForeground} />
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
